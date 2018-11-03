let _ = require('lodash');
let db = require('../util/dbutil');

class _dao {

    /**
     *
     * @param json
     */
    constructor(json) {
        Object.assign(this, json);
    }

    /**
     *
     */
    save() {
        var sql = this.id ? null : this.getInsertStatement();;
        db.execute(statement);
    }

    /**
     *
     */
    delete() {
        var sql = '';
        db.execute(statement);
    }

    /**
     *
     */
    validate() {
    }



    /**
     *
     * @param id
     * @returns {*}
     */
    static findById(id, eager) {
        var tableName = this.getTableName(this.name);
        var build = this.build;
        var hasOne = this.meta().hasOne;

        return new Promise(function (resolve, reject) {
            var obj = null;
            db.execute(`select * from ${tableName} where id = ${id}`).then(result => {
                obj = build(result[0][0]);
                let fKeys =  _.keys(obj).filter(key=> _.endsWith(key,'_id'))

                fKeys.forEach(key => {
                    var id = obj[key];
                    var fn = hasOne[_.trimEnd(key,'_id')];

                    fn.findById(id).then(result =>{
                        obj[_.trimEnd(key,'_id')] = new fn(result);
                    })

                });
                resolve(obj);
            }).catch(err => {
                reject(err);
            });
        });
    }

    static findAll() {
        var statement = `select * from ${this.name.toLowerCase()}`;
        return db.execute(statement);
    }

    static getTableName() {
       return this.name.split(/(?=[A-Z])/).join('_').toLowerCase()
    }



    /**
     *
     */
    static createTable() {
        let ddl =
            `drop table if exists ${this.getTableName()};
             create table if not exists ${this.getTableName()}(${this.getColumnDefinitions()});`;
        db.execute(ddl);
    }



    static getColumnDefinitions() {
        let defs = ['id int auto_increment primary key'];

        defs = _.reduce(this.meta().columns, (acc, column) => {
            if (column) {
                acc.push(_dao.defineColumn(column));
            }
            return acc;
        }, columnDefs);

        defs = _.reduce(this.meta().hasOne, (acc, column) => {
            if (column) {
                acc.push(column.name.toLowerCase() + '_id int null');
            }
            return acc;
        }, defs);

        return defs.join(',');
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
            return !_.isObject(this[key])
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
                accum.push(obj.getValue(val));
            }
            else {
                accum.push(val.id);
            }
            return accum;
        }, [])
    }

    getValue(val) {
        if (_.isString(val)) {
            return '\'' + val + '\'';
        }
        return val;
    }
}

module.exports = _dao;



