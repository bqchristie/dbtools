let _ = require('lodash');
let q = require('q');
let db = require('./dbutil');
let qb = require('./query.builder');


class dao {

    /**
     *
     * @param json
     */
    constructor(json) {
        Object.assign(this, json);
    }

    save() {
        var sql = this.id ? qb.getUpdateStatement(this) : qb.getInsertStatement(this);
        return db.execute(sql);
    }

    delete() {
        var sql = '';
        db.execute(statement);
    }

    validate() {
    }


    //Utility
    static getTableName() {
        return this.name.split(/(?=[A-Z])/).join('_').toLowerCase()
    }

    static getColumnDefinitions() {
        let defs = ['id int auto_increment primary key'];

        defs = _.reduce(this.meta().columns, (acc, column) => {
            if (column) {
                acc.push(dao.defineColumn(column));
            }
            return acc;
        }, defs);

        defs = _.reduce(this.meta().hasOne, (acc, fn) => {
            if (fn.name) {
                acc.push(fn.name.split(/(?=[A-Z])/).join('_').toLowerCase() + '_id int null');
            }
            return acc;
        }, defs);


        return defs.join(',');
    }

    // Finders //

    /*
     *  This should take one id or an array of ids.
     */
    static findById(id, eager) {
        var tableName = this.getTableName();
        var build = this.prototype.constructor;
        var hasOne = this.meta().hasOne;

        function _getRelatedObjectCollections(obj, resolve, meta) {
            if (!meta.hasMany) resolve(obj);

            _.keys(meta.hasMany).forEach(key => {
                if (meta.hasMany[key].meta().isJoin) {
                    var fn = meta.hasMany[key];
                    fn.findRelated().then(result => {
                        obj[key] = result;
                        resolve(obj);
                    })
                }
                else {
                    resolve(obj);
                }

            });

        }

        function _getForeignObjects(obj, resolve, meta) {
            let fKeys = _.keys(obj).filter(key => _.endsWith(key, '_id'))

            var promises = [];

            fKeys.forEach(key => {
                console.log(key);
                var fn = _.find(hasOne,function(clazz) {
                    //Example compare ProductCategory to product_category_id
                    //get it to productcategory to productcategory
                    return clazz.name.toLowerCase() === _.trimEnd(key, '_id').replace(/_/gi,'');
                });
                //If the fk is null don't get it
                if(obj[key]) {
                    promises.push(fn.findById(obj[key]));
                }
            });


            if (promises.length > 0) {

                q.all(promises).then(results => {
                    fKeys.forEach((key, idx) => {
                        var fn = _.find(hasOne,function(clazz) {
                            return clazz.name.toLowerCase() === _.trimEnd(key, '_id');
                        });
                        obj[_.trimEnd(key, '_id')] = new fn(results[idx]);
                    });
                    _getRelatedObjectCollections(obj, resolve, meta);
                })
            }
            else {
                _getRelatedObjectCollections(obj, resolve, meta);
            }
        }

        return new Promise(function (resolve, reject) {
            var obj = null;
            //Get Main Object
            db.execute(`select * from ${tableName} where id = ${id}`).then(result => {
                obj = new build(result[0][0]);

                //Get foreign Objects - 0...1 relationships
                _getForeignObjects(obj, resolve, obj.constructor.meta());

            }).catch(err => {
                console.log(err);
                reject(err);
            });
        });
    }

    static findAll() {
        var statement = `select * from ${this.name.toLowerCase()}`;
        return db.execute(statement);
    }

    //Take a join fn and fn
    //looks at relation
    static findRelated() {
        return new Promise(function (resolve, reject) {
            var sql = `select * from role_permission as a
            left join permission as b on a.permission_id = b.id
            where a.role_id = 1;`;
            db.execute(sql).then(results => {
                resolve(results[0]);
            });

        });
    }


    static createTable() {
        let ddl =
            `drop table if exists ${this.getTableName()};
             create table if not exists ${this.getTableName()}(${this.getColumnDefinitions()});`;
        db.execute(ddl);
    }


    /**
     * This methdod should look at the data type and apply the appropriate DDL
     *
     * @param column
     * @returns {string}
     */
    static defineColumn(column) {
        return column.name + ' varchar(100) null';
    }

    getInsertStatement() {
        var columns = this.getColumns().join(",");
        var values = this.getValues(this);
        var insert = `INSERT INTO ${this.constructor.name}(${columns}) values(${values});`;
        return insert;
    }

    getColumns() {
        let keys = _.keys(this)

        keys = keys.filter(key => {
            return !_.isObject(this[key]) && !_.isNil(this[key]);
        });

        keys = keys.concat(this.getForeignKeys())

        return keys;
    }

    getForeignKeys() {
        let keys = _.keys(this);
        keys = keys.filter(key => {
            return _.isObject(this[key])
        });
        return keys.map(key => key + '_id');
    }

    getValues() {
        var columns = this.getColumns();
        var obj = this;
        return columns.reduce(function (accum, column) {
            let val = obj[_.trimEnd(column, '_id')];
            if (!_.isObject(val)) {
                val = _.isString(val)? '\'' + val + '\'':val;
                accum.push(val);
            }
            else {
                accum.push(val.id);
            }
            return accum;
        }, [])
    }
}

module.exports = dao;



