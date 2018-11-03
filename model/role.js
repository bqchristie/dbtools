var DAO = require('../db/dao');
var rolePermission = require('./role.permission');

module.exports = class Role extends DAO {

    static meta() {
        return {
            columns: [
                {name:'name'}
            ],
            hasMany: {
                permissions: rolePermission
            }
        }
    }
    static build(data) {
        return new Role(data);
    }

    constructor(obj) {
        super(obj);
    }
}
