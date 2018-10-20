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
        this.execute(this.getInsertStatement())
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
        db.execute(statement)

    }

    /**
     *
     * @param id
     * @returns {*}
     */
    static findById(id) {
        console.log(`select * from ${this.constructor.meta().table} where id = ${id}`);
        return this.build({name: "Alice"});
    }

    /**
     *
     */
    static createTable() {
        let ddl = `drop table if exists ${this.meta().table}; 
        create table if not exists ${this.meta().table}
        (
	        id int auto_increment primary key,
	        name varchar(100) null,
	        skqzziks varchar(100) null
        );`;
        this.execute(ddl);
    }

    getInsertStatement() {
        var columns = this.getColumns().join(",");
        var values = this.getValues(this);

        var insert = `INSERT INTO TABLE ${this.getTableName()}(${columns}) values(${values}) `;
        return insert;
    }

    getTableName() {
        return this.constructor.meta().table;
    }

    getColumns() {
        return _.keys(this);

    }

    getValues() {
        var columns = this.getColumns();
        var obj = this;
        return columns.reduce(function (accum, column) {
            let val = obj[column];
            if (!_.isObject(val)) {
                accum.push(obj.getValue(val));
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


