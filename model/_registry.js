let User = require('./user');
let Role = require('./role');
let Permission = require('./permission');

var mappings = {
    user: User,
    role: Role,
    permission: Permission
}

let registry = {
    getModel: function (name) {
        return mappings[name];
    }
}

module.exports = registry;