var DAO = require('../db/dao');

class List extends DAO {
}

module.exports = List;

/**
 * Add related object dependencies here
 * @type {User}
 */
let user = require('./user');
let listShare = require('./list.share');

List.meta = {
    columns: [
        {name: 'name'}
    ],
    hasOne: [user],
    hasMany: {
        listShares: listShare
    }
}
