let DBUtil = require('../db/dbutil');
let User = require('../model/user');
let Role = require('../model/role');
let Permission = require('../model/permission');
let RolePermission = require('../model/role.permission');
let Product = require('../model/product');
let ProductCategory = require('../model/product.category');
let List = require('../model/list');
let ListItem = require('../model/list.item');
let ListShare = require('../model/list.share');


DBUtil.toggleConstraints(false)
    .then(results => {
        return DBUtil.generateTables([
            User,
            Role,
            Permission,
            RolePermission,
            Product,
            ProductCategory,
            List,
            ListItem,
            ListShare])
    })
    .then(results => {
        return DBUtil.toggleConstraints(true);
    })
    .catch( err => {console.log(err)});
