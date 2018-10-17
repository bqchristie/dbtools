let _ = require('lodash');
let Person = require('./model/person');
let Role = require('./model/role');
let Right = require('./model/right');
let faker = require('faker');


//Create Rights


//Create Roles

//Create People

_.times(10000, function(data){
    let person = new Person({name: faker.name.firstName()});
    person.save();
})