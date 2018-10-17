var DAO = require('./_dao');

module.exports = class Role extends DAO {

    static meta() {
        return {
            table: "Role"
        }
    }

    constructor(obj) {
        super(obj);
    }
}
