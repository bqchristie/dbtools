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
        this.id ? this.update() : this.insert();
    }

    /**
     *
     */
    update() {
        var statement = `update ${this.constructor.meta().table} values ${this.name}`;
        this.execute(statement)
    }

    /**
     *
     */
    insert() {
        var statement = this.getInsertStatement();
        console.log(statement);
        this.constructor.execute(statement)
    }

    /**
     *
     */
    delete() {
        console.log('');
    }

    /**
     *
     */
    validate() {
    }

    /**
     *
     * @param statement
     */
    static execute(statement) {
        return db.execute(statement);
    }

    /**
     *
     * @param id
     * @returns {*}
     */
    static findById(id, eager) {
        var tableName = this.name.toLowerCase();
        var build = this.build;
        var hasOne = this.meta().hasOne;

        return new Promise(function (resolve, reject) {
            console.log();
            var obj = null;
            db.execute(`select * from ${tableName} where id = ${id}`).then(result => {
                obj = build(result[0][0]);
                let fKeys =  _.keys(obj).filter(key=> _.endsWith(key,'_id'))
                console.log('!!!!!!!!!!!!!!!!');
                console.log(fKeys);
                console.log(hasOne);
                fKeys.forEach(key => {
                    var id = obj[key];
                    var fn = hasOne[_.trimEnd(key,'_id')];
                    console.log('??????????');
                    console.log(id);
                    console.log('****************');
                    console.log(fn);
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
        var statement = `select * from ${this.name.toLowerCase()}`
        return this.execute(statement);
    }

    /**
     *
     */
    static createTable() {
        let ddl =
            `drop table if exists ${this.name.toLowerCase()};
            create table if not exists ${this.name.toLowerCase()}(${this.getColumnDefinintions()});`;

        this.execute(ddl);
    }

    static getColumnDefinintions() {


        let defs = _.reduce(this.meta().columns, (acc, column) => {

            if (column) {
                acc.push(_dao.defineColumns(column));
            }
            return acc;
        }, ['id int auto_increment primary key']);

        defs = _.reduce(this.meta().hasOne, (acc, column) => {
            if (column) {
                acc.push(column.name.toLowerCase() + '_id int null');
            }
            return acc;
        }, defs);

        return defs.join(',');
    }

    static defineColumns(column) {
        return column.name + ' varchar(100) null';
    }

    getInsertStatement() {
        var columns = this.getColumns().join(",");
        var values = this.getValues(this);

        var insert = `INSERT INTO ${this.constructor.name}(${columns}) values(${values});`;
        return insert;
    }

    getTableName() {
        return this.constructor.meta().table;
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



