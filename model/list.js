var DAO = require('../db/dao');
class List extends DAO {}

module.exports = List;

let user = require('./user');
let listShare = require('./list.share');

List.meta = function(){
    return {
        columns: [
            {name:'name'}
        ],
        hasOne:[user],
        hasMany: {
            listShares: listShare
        }
    }
}