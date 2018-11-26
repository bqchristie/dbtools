let _ = require('lodash');
let q = require('q');
let db = require('./dbutil');
let queryHelper = require('./query.helper');


class dao {

    /**
     *
     * @param json
     */
    constructor(json) {
        Object.assign(this, json);
    }

    static createTable() {
        return db.execute(queryHelper.createTableDDL(this));
    }
    static findAll() {
        return db.execute(queryHelper.findAll());
    }
    static findById(id) {
        var tableName = queryHelper.getTableName(this);
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

        function _getRelatedObjects(obj, resolve, meta) {
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
            db.execute(queryHelper.findById(dao, id)).then(result => {
                obj = new build(result[0][0]);

                //Get foreign Objects - 0...1 relationships
                _getRelatedObjects(obj, resolve, obj.constructor.meta());

            }).catch(err => {
                console.log(err);
                reject(err);
            });
        });
    }
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

    save() {
        return db.execute((this.id ? queryHelper.getUpdateStatement(this) : queryHelper.getInsertStatement(this)));
    }
}

module.exports = dao;



