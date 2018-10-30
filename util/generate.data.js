let _ = require('lodash');
let faker = require('faker');

let Person = require('../model/person');
let Role = require('../model/role');
let Right = require('../model/permission');


//Create Rights

//Create Roles
let roles = ['admin', 'user', 'helpdesk']

roles.forEach(name=>{
    let role = new Role( {name:name});
    role.save();
})



let allRoles = [];
Role.findAll()
    .then(results => {
        console.log(results[0][0].id);
        console.log(results[0][0].name);
        allRoles = results[0];

        //Create People
        _.times(10, function (data) {
            let person = new Person({
                firstName: faker.name.firstName(),
                lastName: faker.name.lastName(),
                phone: faker.phone.phoneNumber(),
                role: allRoles[0]
            });
            person.save();
        })

    })
    .catch(err => {
    console.log(err)
});


