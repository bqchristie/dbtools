var DAO = require('../db/dao');

class Role extends DAO {
};
module.exports = Role;

let rolePermission = require('./role.permission');

Role.meta = {
    columns: [
        {name: 'name', unique: true}
    ],
    hasMany: {
        permissions: rolePermission
    }
}



