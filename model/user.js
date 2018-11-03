var DAO = require('../db/dao');
var role = require('./role');

module.exports = class User extends DAO {

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



