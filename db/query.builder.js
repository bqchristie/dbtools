const _ = require('lodash');

function getInsertStatement(dao) {
    let columns = dao.getColumns().join(",");
    let values = dao.getValues(dao);
    let insert = `INSERT INTO ${dao.constructor.getTableName()}(${columns}) values(${values});`;
    return insert;
}

function getUpdateStatement(dao) {
    var columns = _.keys(dao);
    columns = columns.map(column => {
        return column + '=' + getValue(dao[column]);
    });

    let update = `UPDATE ${dao.constructor.getTableName()} SET ${columns.join(', ')} WHERE id = ${dao.id}`

    return update;
}


function getValue(val) {
   return '\'' + val + '\'';
}


module.exports = {
    getInsertStatement,
    getUpdateStatement
}


