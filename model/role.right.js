var DAO = require('./_dao');

module.exports = class RoleRight extends DAO {

    static meta() {
        return {
            columns: [
                {name:'name'}
            ]
        }
    }

    constructor(obj) {
        super(obj);
    }
}