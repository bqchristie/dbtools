let _ = require('lodash');

class _dao {

    constructor(json) {
        Object.assign(this, json);
    }

    save() {
        this.id ? this.update() : this.insert();
    }

    update() {
        var statement = `update ${this.constructor.meta().table} values ${this.name}`;
        this.execute(statement)
    }

    insert() {
        this.execute(this.getInsertStatement())
    }

    delete() {
        console.log('');
    }

    validate() {
    }

    execute(statement) {
        console.log(statement);
    }

    static findById(id) {
        console.log(`select * from ${this.constructor.meta().table} where id = ${id}`);
        return this.build({name: "Alice"});
    }

    static createTable() {
        console.log(`create table ${this.constructor.meta().table}`);
    }

    getCreateStatement(obj) {
        let ddl = 'CREATE TABLE IF NOT EXISTS ' + obj.meta.tablename;
        let foreignKeys = []
        if(obj.meta.references){
            foreignKeys.push(reference.meta.tablename)
        }
        return ddl;
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


