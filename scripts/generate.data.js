let _ = require('lodash');
let faker = require('faker');

let User = require('../model/user');
let Role = require('../model/role');
let Permission = require('../model/permission');
let RolePermsion = require('../model/role.permission');
let Product = require('../model/product');


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

        Role.findAll().then(roles=>{
            console.log(roles[1]);
            let users = [];
            _.times(100000, function (data) {
                let person = new User({
                    firstName: faker.name.firstName(),
                    lastName: faker.name.lastName(),
                    phone: faker.phone.phoneNumber(),
                    role: roles[_.random(0, roles.length-1)]
                });
                users.push(person.save());
            });
            console.log('have an array of promises...');
            Promise.all(users).then(results=>{
                resolve('Users Generated');
            }).catch( err => {
                console.log(err);
            })
        });
    });
}

function loadProducts(){
    return new Promise((resolve, reject)=>{
        let products = ['apple juice', 'ground beef', 'bananas','apples', 'tin foil', 'sliced bread', 'chicken breast'];
        products = products.map(name=>{
            let products = new Product({name: name});
            return products.save();
        });

        Promise.all(products).then(results=>{
            resolve('Products created...');
        }).catch(err=>{
            console.log(err);
            reject(err);
        });
    })
}


let loaders = [];
loaders.push(loadPermissions());
loaders.push(loadRoles());
loaders.push(loadUsers());
loaders.push(loadProducts());

Promise.all(loaders).then(results=>{
    results.forEach(result=>{
        console.log(result);
    })
    process.exit();
});

