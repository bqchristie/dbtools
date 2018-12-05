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


function generateFakeUsers() {
    return new Promise( (resolve, reject) => {
        Role.findAll().then(roles => {
            let users = [];
            _.times(1000, function () {
                users.push(User.fake(roles));
            });
            resolve(users);
        });
    })
}


Promise.resolve()
    .then(() => doBulkInsert(Permission, require('./data/permissions')))
    .then(() => doBulkInsert(Role, require('./data/roles')))
    .then(() => doBulkInsert(Permission, require('./data/permissions')))
    .then(() => doBulkInsert(Product, require('./data/products')))
    .then(() => doBulkInsert(ProductCategory, require('./data/product.categories')))
    .then(() => generateFakeUsers())
    .then((users) => doBulkInsert(User, users))
    .catch(err => console.log(err))
    .then(() => {
        console.log('done');
        process.exit();
    })
