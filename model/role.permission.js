var DAO = require('../db/dao');
var role = require('./role');
var permission = require('./permission');

module.exports = class RolePermission extends DAO {

    static meta() {
        return {
            hasOne: [role,permission],
            isJoin: true,
        }
    }
}