var DAO = require('../db/dao');
let DBUtil = require('../db/dbutil')
let faker = require('faker');
let _ = require('lodash');



class User extends DAO {
}

module.exports = User;

var role = require('./role');

User.meta = {
    columns: [
        {name: 'email'},
        {name: 'password'},
        {name: 'firstName'},
        {name: 'lastName'},
        {name: 'phone'},
    ],
    hasOne: [role]
}


User.fake  = function(roles){

    let hash = DBUtil.encrypt('password');

    return new User({
        email: faker.internet.email(),
        password: hash,
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        phone: faker.phone.phoneNumber(),
        role: roles[_.random(0, roles.length - 1)]
    });
}


