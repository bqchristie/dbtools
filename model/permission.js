var DAO = require('../db/dao');
class Permission extends DAO {};
module.exports = Permission;

Permission.meta = function(){
    return {
        columns: [
            {name:'name'}
        ]
    }
}
