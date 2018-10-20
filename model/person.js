var DAO = require('./_dao');

module.exports = class Person extends DAO {

    static meta() {
        return {
            columns: [
                {name:'firstName'},
                {name:'lastName'},
                {name:'phone'}
            ]
        }
    }

    static build(data) {
        return new Person(data);
    }

    constructor(obj) {
        super(obj);
    }
}



