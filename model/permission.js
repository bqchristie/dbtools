var DAO = require('../db/dao');

class Permission extends DAO {
};

module.exports = Permission;

Permission.meta = {
    columns: [
        {name: 'name'}
    ]
}

