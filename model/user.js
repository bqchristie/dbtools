var DAO = require('../db/dao');

class User extends DAO {
}

module.exports = User;

var role = require('./role');

User.meta = {
    columns: [
        {name: 'firstName'},
        {name: 'lastName'},
        {name: 'phone'}
    ],
    hasOne: [role]
}





