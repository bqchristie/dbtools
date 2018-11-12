var DAO = require('../db/dao');
class ProductCategory extends DAO {}

module.exports = ProductCategory;

ProductCategory.meta = function(){
    return {
        columns: [
            {name:'name'}
        ]
    }
}