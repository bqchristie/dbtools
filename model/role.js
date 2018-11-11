var DAO = require('../db/dao');

class Role extends DAO {};
module.exports = Role;

var rolePermission = require('./role.permission');

Role.meta = function () {
    return {
        columns: [
            {name: 'name'}
        ],
        hasMany: {
            permissions: rolePermission
        }
    }
}


Role.build = function (data) {
    return new Role(data);
}

