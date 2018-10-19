const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'password',
    database: 'test'
});

var ddl = [];

ddl.push(`CREATE TABLE test8
(
    id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    column_2 INT(11)`
);

//ddl.push(`CREATE UNIQUE INDEX test_id_uindex8 ON test8 (id);`)

ddl.forEach(function (stmnt) {
    connection.query(
        stmnt,
        function(err, results, fields) {
            console.log(err);
            console.log(results); // results contains rows returned by server
            console.log(fields); // fields contains extra meta data about results, if available
        }
    );
})

// simple query


