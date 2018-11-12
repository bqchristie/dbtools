let User = require('./user');
let Role = require('./role');
let Permission = require('./permission');
let Product = require('./product');
let ProductCategory = require('./product.category');

var mappings = {
    user: User,
    role: Role,
    permission: Permission,
    product: Product,
    productCategory: ProductCategory
}

let registry = {
    getModel: function (name) {
        return mappings[name];
    }
}

module.exports = registry;