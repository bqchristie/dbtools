const mysql = require('mysql2');
const config = require('../config/config');

// create the connection to database
const connection = mysql.createConnection(config.db);

class DBUtil {

    static closeConnections(){
        connection.close();
    }

    static generateTables(objs) {
        var promises = [];
        objs.forEach(obj => {
            promises.push(obj.createTable());
        })

        Promise.all(promises).then(results =>{
           process.exit();
        });

    }

    static execute(statements) {
        return new Promise(function (resolve, reject) {
            var sql = statements.split(';');
            var retval = [];

            sql.forEach(statement => {
                console.log(statement);
                if (statement) {
                    connection.query(
                        statement,
                        function (err, results, fields) {
                            if (err) {
                                console.log(err);
                                reject(err)
                            }
                            retval.push(results);
                            resolve(retval);
                        });
                }
            });
        });
    };
}


module.exports = DBUtil;