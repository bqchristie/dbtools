var DAO = require('../db/dao');

module.exports = class Permission extends DAO {

    static meta() {
        return {
            columns: [
                {name:'name'}
            ]
        }
    }

    static build(data) {
        return new Permission(data);
    }

    constructor(obj) {
        super(obj);
    }
}