var DAO = require('../db/dao');

class ProductCategory extends DAO {
}

module.exports = ProductCategory;

ProductCategory.meta = {
    columns: [
        {name: 'name'}
    ]
}