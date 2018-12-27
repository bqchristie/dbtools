let _ = require('lodash');
let db = require('./dbutil');
let queryHelper = require('./query.helper');


class dao {

    static dataTypes() {
        return {
            LONG_TEXT: 'VARCHAR(100)',
            DATE_TIME: 'DATETIME',
            BOOLEAN: 'BOOLEAN'
        }
    }
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

    static buildFKConstraints() {
        if (this.meta.hasOne) {
            return db.execute(queryHelper.getFKConstraints(this));
        }
    }


    static bulkInsert(arr) {
        return db.execute(queryHelper.getBulkInsertStatement(arr));
    }

    static deleteById(id) {
        let dao = this;
        return db.execute(queryHelper.deleteById(dao, id))
    }

    static findAll() {
        let that = this;
        return new Promise(function (resolve, reject) {
            db.execute(queryHelper.findAll(that)).then(results => {
                resolve(results[0]);
            }).catch(err => reject(err))
        })
    }

    static find(obj) {
        let that = this;
        return new Promise(function (resolve, reject) {
            db.execute(queryHelper.find(that, obj)).then(results => {
                resolve(results[0]);
            }).catch(err => reject(err))
        })
    }

    static findById(id) {
        let build = this.prototype.constructor;
        let hasOne = this.meta.hasOne;
        let that = this;

        function _getRelatedObjectCollections(obj, resolve, meta) {
            if (!meta.hasMany) resolve(obj);

            _.keys(meta.hasMany).forEach(key => {
                var fn = meta.hasMany[key];
                fn.findRelated(obj, meta.hasMany[key].meta.isJoin).then(result => {
                    obj[key] = result;
                    resolve(obj);
                })
            });

        }

        function _getRelatedObjects(obj, resolve, meta) {
            let fKeys = _.keys(obj).filter(key => _.endsWith(key, '_id'))

            var promises = [];

            fKeys.forEach(key => {
                console.log(key);
                var fn = _.find(hasOne, function (clazz) {
                    //Example compare ProductCategory to product_category_id
                    //get it to productcategory to productcategory
                    return clazz.name.toLowerCase() === _.trimEnd(key, '_id').replace(/_/gi, '');
                });
                //If the fk is null don't get it
                if (obj[key]) {
                    promises.push(fn.findById(obj[key]));
                }
            });


            if (promises.length > 0) {

                Promise.all(promises).then(results => {
                    fKeys.forEach((key, idx) => {
                        var fn = _.find(hasOne, function (clazz) {
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
            let obj = null;
            //Get Main Object
            db.execute(queryHelper.findById(that, id)).then(result => {
                obj = new build(result[0][0]);

                //Get foreign Objects - 0...1 relationships
                _getRelatedObjects(obj, resolve, obj.constructor.meta);

            }).catch(err => {
                console.log(err);
                reject(err);
            });
        });
    }

    static findRelated(owner, isJoin) {
        let that = this;
        let sql = queryHelper.findRelatedObjects(owner, this, isJoin);

        return new Promise(function (resolve, reject) {

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



