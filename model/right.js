var DAO = require('./_dao');

module.exports = class Right extends DAO {
    static meta() {
        return {
            table: "Right"
        }
    }

    constructor(obj) {
        super(obj);
    }
}