const _ = require('lodash');


/**
 * dao is either an instance of a class or its being passed
 * from a static method.
 *
 * @param dao
 */
function getDAOTableName(dao) {
    let name = dao.constructor.name == "Function" ? dao.name : dao.constructor.name;
    return _.snakeCase(name);
}

function createTableDDL(dao) {
    let tableName = getDAOTableName(dao);
    let ddl =
        `drop table if exists ${tableName};
         create table if not exists ${tableName}(${getColumnDDL(dao.meta())});`;
    return ddl;
}

function getColumnDDL(meta) {
    let defs = ['id int auto_increment primary key'];

    defs = _.reduce(meta.columns, (acc, column) => {
        if (column) {
            acc.push(defineColumn(column));
        }
        return acc;
    }, defs);

    defs = _.reduce(meta.hasOne, (acc, fn) => {
        if (fn.name) {
            acc.push(fn.name.split(/(?=[A-Z])/).join('_').toLowerCase() + '_id int null');
        }
        return acc;
    }, defs);

    return defs.join(',');
}

function getInsertStatement(dao) {
    let tableName = getDAOTableName(dao);
    let columns = getSetColumns(dao).join(",");
    let values = getSetValues(dao);
    let insert = `INSERT INTO ${tableName}(${columns}) values(${values});`;
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

function findAll(dao) {
    return `select * from ${getDAOTableName(dao)}`;
}

function findById(dao, id) {
    return `select * from ${getDAOTableName(dao)} where id = ${id}`
}

function getForeignKeys(dao) {
    let keys = _.keys(dao);
    keys = keys.filter(key => {
        return _.isObject(dao[key])
    });
    return keys.map(key => key + '_id');
}

/**
 * return only the column names that have actually been set on the object
 *
 * @returns {*[]}
 */
function getSetColumns(dao) {
    let keys = _.keys(dao)

    keys = keys.filter(key => {
        return !_.isObject(dao[key]);
    });

    keys = keys.concat(getForeignKeys(dao))

    return keys;
}

function getSetValues(dao) {
    var columns = getSetColumns(dao);
    var obj = dao;
    return columns.reduce(function (accum, column) {
        let val = obj[_.trimEnd(column, '_id')];
        if (!_.isObject(val)) {
            val = _.isString(val) ? '\'' + escSQL(val) + '\'' : val;
            accum.push(val);
        }
        else {
            accum.push(val.id);
        }
        return accum;
    }, [])
}

function  escSQL(str) {
    return _.replace(str, /'/gm,'\\\'')
}

/**
 * This method should look at the data type and apply the appropriate DDL
 *
 * @param column
 * @returns {string}
 */
function defineColumn(column) {
    return column.name + ' varchar(100) null';
}


function getValue(val) {
    return '\'' + val + '\'';
}


module.exports = {
    getTableName: getDAOTableName,
    createTableDDL,
    getInsertStatement,
    getUpdateStatement,
    findAll,
    findById
}


