const DAO = require('../db/dao');

class ListItem extends DAO {
}

module.exports = ListItem;

let list = require('./list');
let product = require('./product');

ListItem.meta = {
    hasOne: [list, product]
}
