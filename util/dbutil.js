class DBUtil {

    static generateTables(objs) {
        objs.forEach(obj => obj.createTable())
    }

    static execute(statement) {
        console.log(statement);
    }

}

module.exports = DBUtil;