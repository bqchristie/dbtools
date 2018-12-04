let _ = require('lodash');
let faker = require('faker');

let User = require('../model/user');
let Role = require('../model/role');
let Permission = require('../model/permission');
let RolePermsion = require('../model/role.permission');
let Product = require('../model/product');
let ProductCategory = require('../model/product.category');


function doBulkInsert(dao, json, resolve, reject) {
    let data = mapData(json, dao)
    dao.bulkInsert(data).then(data => {
        resolve('Bulk Data Generated');
    }).catch(err => {
        console.log(err);
        reject(err);
    })
}

function mapData(data, clazz) {
    return data.map(obj => {
        return new clazz(obj);
    });
}

function loadPermissions() {
    return new Promise((resolve, reject) => {
        doBulkInsert(Permission, require('./data/permissions'), resolve, reject)
    })
}

function loadRoles() {
    return new Promise((resolve, reject) => {
        doBulkInsert(Role, require('./data/permissions'), resolve, reject)
    })
}


function loadProducts() {
    return new Promise((resolve, reject) => {
        doBulkInsert(Product, require('./data/products'), resolve, reject)
    })
}

function loadProductCatergories() {
    return new Promise((resolve, reject) => {
        doBulkInsert(ProductCategory, require('./data/product.categories'), resolve, reject)
    })
}

function loadUsers() {
    return new Promise((resolve, reject) => {

        Role.findAll().then(roles => {
            console.log(roles[1]);
            let users = [];
            _.times(1000, function (data) {
                let user = new User({
                    firstName: faker.name.firstName(),
                    lastName: faker.name.lastName(),
                    phone: faker.phone.phoneNumber(),
                    role: roles[_.random(0, roles.length - 1)]
                });
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