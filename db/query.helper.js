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
         create table if not exists ${tableName}(${getColumnDDL(dao.meta)});`;
    ddl = ddl + getUniqueConstraints(tableName, dao.meta);
    return ddl;
}

function getUniqueConstraints(tableName, meta) {
    if(!meta.columns) return '';

    let constraints = [];
    let uniqueColumns = meta.columns.filter(column => {
        return column.unique
    })

    uniqueColumns.forEach( column => {
        constraints.push(`CREATE UNIQUE INDEX ${tableName}_${column.name}_uindex ON ${tableName} (${column.name});`)
    })

    let uniqueBy = meta.uniqueBy;
    if(uniqueBy) {
        constraints.push(`CREATE UNIQUE INDEX ${tableName}_${uniqueBy.join('_')}_uindex ON ${tableName} (${uniqueBy.join(',')});`)
    }

    return constraints.join('');
}

function deleteById(dao, id) {
    return `delete from ${getDAOTableName(dao)} where id = ${id}`
}

function getColumnDDL(meta) {
    let defs = ['id int auto_increment primary key'];

    defs = _.reduce(meta.columns, (acc, column) => {
        if (column) {
            acc.push(defineColumn(column));
        }
        return acc;
    }, defs);

    //build the foreign keys
    defs = _.reduce(meta.hasOne, (acc, fn) => {
        if (fn.name) {
            acc.push(_.snakeCase(fn.name) + '_id int null');
        }
        return acc;
    }, defs);

    //add audit columns
    defs.push('created_date_time datetime not null default now()');
    defs.push('updated_date_time datetime');

    return defs.join(',');
}

function getFKConstraints(dao) {
    let tableName = getDAOTableName(dao);
    let foreignKeys = dao.meta.hasOne;
    let foreignKeysDLL = [];

    foreignKeys.forEach(key => {
        if (key) {
            let foreignTableName = _.snakeCase(key.name);

            let ddl = `ALTER TABLE ${tableName}
        ADD CONSTRAINT ${tableName}_${foreignTableName}_fk
        FOREIGN KEY (${foreignTableName}_id) REFERENCES ${foreignTableName} (id);`
            foreignKeysDLL.push(ddl);
        }
    })

    return foreignKeysDLL.join(';\n');
}


function getInsertStatement(dao) {
    let tableName = getDAOTableName(dao);
    let columns = getInstanceColumns(dao).join(",");
    let values = getInstanceValues(dao);
    let insert = `INSERT INTO ${tableName}(${columns}) values(${values});`;
    return insert;
}

function getBulkInsertStatement(daoArray) {
    let dao = daoArray[0];
    let tableName = getDAOTableName(dao);
    let columns = getInstanceColumns(dao).join(",");
    let values = []
    daoArray.forEach(dao => {
        values.push('(' + getInstanceValues(dao).join(',') + ')')
    })
    let insert = `INSERT INTO ${tableName}(${columns})\n VALUES\n ${values.join(',\n')};`;
    return insert;
}

function getUpdateStatement(dao) {
    let tableName = getDAOTableName(dao);
    let columns = getInstanceColumns(dao).map( column => _.snakeCase(column));
    let values = getInstanceValues(dao);
    let setters = [];

    columns.forEach( (column, idx) => {
        setters.push(`${column} = ${values[idx]}`)
    })

    let update = `UPDATE ${tableName} SET ${setters.join(',')} WHERE id = ${dao.id}`

    return update;
}

function findAll(dao) {
    return `select * from ${getDAOTableName(dao)}`;
}

function find(dao, obj) {
    let conditions = []
    _.keys(obj).forEach(function (key) {
        conditions.push(`${key} = '${obj[key]}'`)
    });
    return `select * from ${getDAOTableName(dao)}  where ${conditions.join(' and ')}`;
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

function findRelatedObjects(ownerObj, relatedObj, isJoin) {

    if (isJoin) {
        var joinedObj = _.find(relatedObj.meta.hasOne, function (fn) {
            return getDAOTableName(fn) != getDAOTableName(ownerObj);
        });

        return `select * from ${getDAOTableName(relatedObj)} as a
                left join ${getDAOTableName(joinedObj)} as b on a.${getDAOTableName(joinedObj)}_id = b.id
                where ${getDAOTableName(ownerObj)}_id = ${ownerObj.id};`
    }
    else {
        return `select * from ${getDAOTableName(relatedObj)} where ${getDAOTableName(ownerObj)}_id = ${ownerObj.id};`
    }
}

function getInstanceColumns(dao) {
    let keys = _.keys(dao)

    keys = keys.filter(key => {
        return !_.isObject(dao[key]);
    });

    keys = keys.concat(getForeignKeys(dao))

    return keys;
}

function getInstanceValues(dao) {
    var columns = getInstanceColumns(dao);
    var obj = dao;
    return columns.reduce(function (accum, column) {
        let val = obj[_.replace(column, /_id$/gm, '')];
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

function escSQL(str) {
    return _.replace(str, /'/gm, '\\\'')
}

function defineColumn(column) {
    let mandatory = column.mandatory ? 'not null' : 'null';
    return column.name + ` ${mapDataType(column.type)} ${mandatory}`;
}

function mapDataType(type){
    //If type is not defined return varchar 100
    if (!type) return 'varchar(100)';
    return type;
}

function getValue(val) {
    return '\'' + val + '\'';
}


module.exports = {
    createTableDDL,
    deleteById,
    findAll,
    find,
    findById,
    findRelatedObjects,
    getBulkInsertStatement,
    getFKConstraints,
    getInsertStatement,
    getUpdateStatement,
    getInstanceValues,
    mapDataType
}




