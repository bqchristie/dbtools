let DBUtil = require('../db/dbutil');
let User = require('../model/user');
let Role = require('../model/role');
let Permission = require('../model/permission');
let RolePermission = require('../model/role.permission');
let Product = require('../model/product');
let ProductCategory = require('../model/product.category');


DBUtil.generateTables([
    User,
    Role,
    Permission,
    RolePermission,
    Product,
    ProductCategory

]);

// DBUtil.maintainTables([
//     User,
//     Role,
//     Permission,
//     RolePermission
// ])
