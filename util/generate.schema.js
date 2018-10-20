let DBUtil = require('./dbutil');
let Person = require('../model/person');
let Role = require('../model/role');
let Permission = require('../model/permission');

// console.log(model.Person);


DBUtil.generateTables([
    Person, Permission, Role
]);