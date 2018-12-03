let _ = require('lodash');
let faker = require('faker');

let User = require('../model/user');
let Role = require('../model/role');
let Permission = require('../model/permission');
let RolePermsion = require('../model/role.permission');
let Product = require('../model/product');
let ProductCategory = require('../model/product.category');


function doBulkInsert(dao, arr, resolve, reject) {
    dao.bulkInsert(arr).then(data => {
        resolve('Bulk Data Generated');
    }).catch(err => {
        console.log(err);
        reject(err);
    })
}

function loadPermissions() {
    return new Promise((resolve, reject) => {
        let permissions = ['read', 'update', 'delete'];
        permissions = permissions.map(name => {
            let permission = new Permission({name: name});
            return permission;
        });

        doBulkInsert(Permission, permissions, resolve, reject)
    })
}

function loadRoles() {
    return new Promise((resolve, reject) => {
        let roles = ['admin', 'user', 'helpdesk'];
        roles = roles.map(name => {
            let role = new Role({name: name});
            return role;
        });
        doBulkInsert(Role, roles, resolve, reject)
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

function loadProducts() {
    return new Promise((resolve, reject) => {
        let products = ['apple juice', 'ground beef', 'bananas', 'apples', 'tin foil', 'sliced bread', 'chicken breast'];
        products = products.map(name => {
            let products = new Product({name: name});
            return products;
        });
        doBulkInsert(Product, products, resolve, reject);
    })
}

function loadProductCatergories() {
    return new Promise((resolve, reject) => {
        let productCategories = ['fruit', 'vegetables', 'dairy', 'deli', 'frozen goods', 'meat'];
        productCategories = productCategories.map(name => {
            let products = new ProductCategory({name: name});
            return products;
        });
        doBulkInsert(Product, productCategories, resolve, reject);
    })
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