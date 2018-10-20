var DAO = require('./_dao');

module.exports = class Role extends DAO {

    static meta() {
        return {
            columns: [
                {name:'name'}
            ]
        }
    }
    static build(data) {
        return new Role(data);
    }

    constructor(obj) {
        super(obj);
    }
}
