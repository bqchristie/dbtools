const _ = require('lodash');

function getInsertStatement(dao) {
    let columns = dao.getColumns().join(",");
    let values = dao.getValues(dao);
    let insert = `INSERT INTO ${dao.constructor.getTableName()}(${columns}) values(${values});`;
    return insert;
}

function getUpdateStatement(dao) {
    var columns = _.keys(dao);

    console.log(columns);

    columns = columns.map(column => {
        return column + '=' + getValue(dao[column]);
    });

    columns = columns.join(', ');

    console.log(columns);


    let update = `UPDATE ${dao.constructor.getTableName()} SET ${columns} WHERE id = ${dao.id}`

    return update;
}


function getValue(val) {
   return '\'' + val + '\'';
}


module.exports = {
    getInsertStatement,
    getUpdateStatement,
    getValue
}


