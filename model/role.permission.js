var DAO = require('../db/dao');
class RolePermission extends DAO {}

module.exports = RolePermission;


var role = require('./role');
var permission = require('./permission');


RolePermission.meta = function () {

    return {
        hasOne: [role, permission],
        isJoin: true,
    }
}
