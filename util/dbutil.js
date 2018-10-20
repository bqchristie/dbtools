const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'password',
    database: 'test'
});

class DBUtil {

    static generateTables(objs) {
        objs.forEach(obj => obj.createTable())
    }

    static execute(statements) {
        var sql = statements.split(';');

        sql.forEach(statement => {
            if(statement) {
                connection.query(
                    statement,
                    function (err, results, fields) {
                        if(err) {
                            console.log(err);
                        }
                        // console.log(results); // results contains rows returned by server
                        // console.log(fields); // fields contains extra meta data about results, if available
                    });
            }
        })
    }

}

module.exports = DBUtil;