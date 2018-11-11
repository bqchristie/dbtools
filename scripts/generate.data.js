let _ = require('lodash');
let faker = require('faker');

let User = require('../model/user');
let Role = require('../model/role');
let Permission = require('../model/permission');
let RolePermsion = require('../model/role.permission');



let permissions = ['read', 'update', 'delete']


async function loadRoles(){
    return new Promise((resolve, reject)=>{
        let roles = ['admin', 'user', 'helpdesk']


    })
}



permissions.forEach(name => {
    let permission = new Permission({name: name});
    permission.save();
});

_.times(10, function (data) {
    let person = new User({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        phone: faker.phone.phoneNumber(),
        role: Role.findById(1)
    });
    person.save();
});

