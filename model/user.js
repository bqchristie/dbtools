var DAO = require('./_dao');
var role = require('./role');

module.exports = class User extends DAO {

    constructor(obj) {
        super(obj);
    }

    static build(data) {
        return new User(data);
    }

    static meta() {
        return {
            columns: [
                {name: 'firstName'},
                {name: 'lastName'},
                {name: 'phone'}
            ],
            hasOne: {
                role: role
            }
        }
    }
}



