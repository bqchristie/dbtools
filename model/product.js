var DAO = require('../db/dao');
class Product extends DAO {}

module.exports = Product;

var productCategory = require('./product.category');


Product.meta = function(){
    return {
        columns: [
            {name:'name'}
        ],
        hasOne: [productCategory]
    }
}
