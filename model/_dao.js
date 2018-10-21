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
        let ddl =
            `drop table if exists ${this.name.toLowerCase()};
            create table if not exists ${this.name.toLowerCase()}(${this.getColumnDefinintions()});`;

        console.log(ddl);
        this.execute(ddl);
    }

    static getColumnDefinintions() {


        let defs = _.reduce(this.meta().columns,(acc, column)=>{

            if(column) {
                acc.push(_dao.defineColumns(column));
            }
            return acc;
        },['id int auto_increment primary key']);

        defs = _.reduce(_.keys(this.meta().hasOne),(acc, column)=>{
            if(column) {
                acc.push(column + '_id int null');
            }
            return acc;
        },defs);

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


create table person
(
    id int auto_increment
primary key,
    firstName varchar(100) null,
    lastName varchar(100) null,
    phone varchar(100) null,
    role_id int null,
    constraint person_role_id_fk foreign key (role_id) references role (id)
)
;

