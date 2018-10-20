var DAO = require('./_dao');

module.exports = class Person extends DAO {

    static meta() {
        return {
            table: "person",
            columns: [
                {name:'firstName'},
                {name:'lastName'},
                {phone:'lastName'}
            ]
        }
    }

    static build(data) {
        return new Model(data);
    }

    constructor(obj) {
        super(obj);
    }
}



