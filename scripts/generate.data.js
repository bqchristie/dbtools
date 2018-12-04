let _ = require('lodash');


let User = require('../model/user');
let Role = require('../model/role');
let Permission = require('../model/permission');
let Product = require('../model/product');
let ProductCategory = require('../model/product.category');


function doBulkInsert(dao, json, resolve, reject) {
    return dao.bulkInsert(_mapData(json, dao));
}

function _mapData(data, clazz) {
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

    return new Promise((resolve, reject) => {

        Role.findAll().then(roles => {
            let users = [];
            _.times(1000, function () {
                users.push(User.fake(roles));
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