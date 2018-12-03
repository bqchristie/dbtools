var DAO = require('../db/dao');
class ListShare extends DAO {}

module.exports = ListShare;

var list = require('./list');
var user = require('./user');

ListShare.meta = function(){
    return {
        hasOne: [list, user]
    }
}