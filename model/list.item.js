var DAO = require('../db/dao');

class ListItem extends DAO {
}

module.exports = ListItem;

var list = require('./list');
var product = require('./product');

ListItem.meta = {
    hasOne: [list, product]
}
