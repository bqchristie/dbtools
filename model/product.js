var DAO = require('../db/dao');

class Product extends DAO {
}

module.exports = Product;

var productCategory = require('./product.category');


Product.meta = {
    columns: [
        {name: 'name', mandatory: true, unique: true},
        {name: 'isActive', type: DAO.dataTypes().BOOLEAN}
    ],
    hasOne: [productCategory]
}
