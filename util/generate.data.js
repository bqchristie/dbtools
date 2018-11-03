let _ = require('lodash');
let faker = require('faker');

let User = require('../model/user');
let Role = require('../model/role');
let Permission = require('../model/permission');
let RolePermsion = require('../model/role.permission');


let roles = ['admin', 'user', 'helpdesk']
let permissions = ['read', 'update', 'delete']

roles.forEach(name => {
    let role = new Role({name: name});
    role.save();
});

permissions.forEach(name => {
    let permission = new Permission({name: name});
    permission.save();
});

_.times(10, function (data) {
    let person = new User({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        phone: faker.phone.phoneNumber(),
    });
    person.save();
});

