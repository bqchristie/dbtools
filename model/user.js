var DAO = require('../db/dao');
let faker = require('faker');
let _ = require('lodash');

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


User.fake  = function(roles){
    return new User({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        phone: faker.phone.phoneNumber(),
        role: roles[_.random(0, roles.length - 1)]
    });
}


