let DBUtil = require('../db/dbutil');
let User = require('../model/user');
let Role = require('../model/role');
let Permission = require('../model/permission');
let RolePermission = require('../model/role.permission');

// console.log(model.Person);


DBUtil.generateTables([
    User,
    Role,
    Permission,
    RolePermission
]);
