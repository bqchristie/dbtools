let _ = require('lodash');
let faker = require('faker');

let User = require('../model/user');
let Role = require('../model/role');
let Permission = require('../model/permission');
let RolePermsion = require('../model/role.permission');


function loadPermissions(){
    return new Promise((resolve, reject)=>{
        let permissions = ['read', 'update', 'delete'];
        permissions = permissions.map(name=>{
            let permission = new Permission({name: name});
            return permission.save();
        });

        Promise.all(permissions).then(results=>{
            resolve('Permissions created...');
        }).catch(err=>{
            console.log(err);
            reject(err);
        });
    })
}

function loadRoles() {
    return new Promise((resolve, reject)=>{
        let roles = ['admin', 'user', 'helpdesk'];
        roles = roles.map(name=>{
            let role = new Role({name: name});
            return role.save();
        });

        Promise.all(roles).then(results=>{
            resolve('Roles created...');
        }).catch(err=>{
            console.log(err);
            reject(err);
        });
    })
}

function loadUsers() {
    return new Promise((resolve, reject)=> {

        Role.findById(1).then(role=>{
            console.log(role);
            var users = [];
            _.times(10, function (data) {
                let person = new User({
                    firstName: faker.name.firstName(),
                    lastName: faker.name.lastName(),
                    phone: faker.phone.phoneNumber(),
                    role: role
                });
                users.push(person.save());
            });

            Promise.all(users).then(results=>{
                resolve('Users Generated');
            })
        });
    });
}


let loaders = [];
loaders.push(loadPermissions());
loaders.push(loadRoles());
loaders.push(loadUsers());

Promise.all(loaders).then(results=>{
    results.forEach(result=>{
        console.log(result);
    })
    process.exit();
});

