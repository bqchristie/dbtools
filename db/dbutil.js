const mysql = require('mysql2');
const _ = require('lodash');
const bcrypt = require('bcryptjs');
const config = require('../config/config');



// create the connection to database
const connection = mysql.createConnection(config.db);

class DBUtil {

    static encrypt(plainText){
        var salt = bcrypt.genSaltSync(9);
        var hash = bcrypt.hashSync(plainText, salt);
        return hash;
    }

    static closeConnections(){
        connection.close();
    }

    static toggleConstraints(on) {
        let statement = `SET FOREIGN_KEY_CHECKS=${on?1:0};`
        return this.execute(statement);
    }

    static generateTables(objs) {
        var promises = [];
        objs.forEach(obj => {
            promises.push(obj.createTable());
        })
        Promise.all(promises).then(results =>{
           this.buildConstraints(objs)
        });

    }

    static buildConstraints(objs){
        var promises = [];
        objs.forEach(obj => {
            //promises.push(obj.createTable());
            promises.push(obj.buildConstraints());
            //console.log(obj);
        });

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
                                console.log(statement);
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