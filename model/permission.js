var DAO = require('./_dao');

module.exports = class Permission extends DAO {

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