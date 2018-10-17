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
        var statement = `insert into ${this.constructor.meta().table} values ${this.name}`;
        this.execute(statement)
    }

    delete() {
        console.log('');
    }

    validate() {

    }

    execute(statement) {
        //DBUtil.execute(statement)
        console.log(statement);
    }

    static findById(id) {
        console.log(`select * from ${this.meta().table} where id = ${id}`);
        return this.build({name: "Alice"});
    }

    static createTable() {
        console.log(`create table ${this.meta().table}`);
    }
}

module.exports = _dao;