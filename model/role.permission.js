var DAO = require('./_dao');
var role = require('./role');
var permission = require('./permission');

module.exports = class RolePermission extends DAO {

    static meta() {
        return {
            hasOne: [role,permission]
        }
    }

    static build(data) {
        return new Role(data);
    }

    constructor(obj) {
        super(obj);
    }
}