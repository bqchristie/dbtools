let _ = require('lodash');
let faker = require('faker');

let User = require('../model/user');
let Role = require('../model/role');
let Permission = require('../model/permission');
let RolePermsion = require('../model/role.permission');
let Product = require('../model/product');
let ProductCategory = require('../model/product.category');


function doBulkInsert(dao, json, resolve, reject) {
    return dao.bulkInsert(mapData(json, dao));
}

function mapData(data, clazz) {
    return data.map(obj => {
        return new clazz(obj);
    });
}

function loadPermissions() {
    return doBulkInsert(Permission, require('./data/permissions'));
}

function loadRoles() {
    return  doBulkInsert(Role, require('./data/permissions'));
}


function loadProducts() {
    return doBulkInsert(Product, require('./data/products'));
}

function loadProductCatergories() {
    return doBulkInsert(ProductCategory, require('./data/product.categories'))
}

function loadUsers() {

    function fakeuser(roles) {
        return new User({
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            phone: faker.phone.phoneNumber(),
            role: roles[_.random(0, roles.length - 1)]
        });
    }

    return new Promise((resolve, reject) => {

        Role.findAll().then(roles => {
            console.log(roles[1]);
            let users = [];
            _.times(1000, function (data) {
                let user = fakeuser(roles);
                users.push(user);
            });
            doBulkInsert(User, users, resolve, reject);
        });
    });
}

let primaryLoaders = [];
primaryLoaders.push(loadPermissions());
primaryLoaders.push(loadRoles());
primaryLoaders.push(loadProductCatergories());

let secondaryLoaders = [];
secondaryLoaders.push(loadUsers());
secondaryLoaders.push(loadProducts());

Promise.all(primaryLoaders).then(results => {
    results.forEach(result => {
        console.log(result);
    })
    Promise.all(secondaryLoaders).then(results => {
        results.forEach(result => {
            console.log(result);
        })
        process.exit()
    });
});