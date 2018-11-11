var DAO = require('../db/dao');
class RolePermission extends DAO {}

module.exports = RolePermission;


var role = require('./role');
var user = require('./user');
var permission = require('./permission');


RolePermission.meta = function () {

    return {
        hasOne: [role, permission],
        isJoin: true,
    }
}

RolePermission.build = function (data) {
    return new RolePermission(data);
}