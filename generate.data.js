let _ = require('lodash');
let Person = require('./model/person');
let Role = require('./model/role');
let Right = require('./model/right');
let faker = require('faker');


//Create Rights


//Create Roles

//Create People

_.times(1, function (data) {
    let person = new Person({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        username: faker.internet.email()
    });
    person.save();
})