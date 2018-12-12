let User = require('./user');
let Role = require('./role');
let Permission = require('./permission');
let Product = require('./product');
let ProductCategory = require('./product.category');
let List = require('./list');
let ListItem = require('./list.item');

var mappings = {
    'user': User,
    'role': Role,
    'permission': Permission,
    'product': Product,
    'product-category': ProductCategory,
    'list': List,
    'list-item': ListItem
}

let registry = {
    getModel: function (name) {
        return mappings[name];
    }
}

module.exports = registry;