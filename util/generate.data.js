let _ = require('lodash');
let faker = require('faker');

let Person = require('../model/person');
let Role = require('../model/role');
let Right = require('../model/permission');


//Create Rights

//Create Roles
let roles = ['admin','user','helpdesk']

roles.forEach(name=>{
    let role = new Role( {name:name});
    role.save();
})


//Create People

_.times(10000, function (data) {
    let person = new Person({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
    });
    person.save();
})