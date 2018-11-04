var DAO = require('../db/dao');
var role = require('./role');
var user = require('./user');
var permission = require('./permission');

module.exports = class RolePermission extends DAO {

    static meta() {
        return {
            hasOne: [role, permission],
            isJoin: true,
        }
    }

    static build(data) {
        return new RolePermission(data);
    }
}