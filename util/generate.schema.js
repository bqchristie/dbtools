let DBUtil = require('./dbutil');
let User = require('../model/user');
let Role = require('../model/role');
let RoleRight = require('../model/role.right');

// console.log(model.Person);


DBUtil.generateTables([
    User,
    RoleRight,
    Role,
]);
