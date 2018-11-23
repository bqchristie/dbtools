let DBUtil = require('../db/dbutil');
let User = require('../model/user');
let Role = require('../model/role');
let Permission = require('../model/permission');
let RolePermission = require('../model/role.permission');



DBUtil.generateTables([
    Role,
    Permission,
    RolePermission,
    // User
]);
