const _ = require('lodash');

let template = (modelName) => { let tmpl =
`const DAO = require('../db/dao');
        
class ${modelName} extends DAO {
}

module.exports = ${modelName};

/**
 * Add related object dependencies here
 * @type {${modelName}}
 */
//let user = require('./user');
//let listShare = require('./list.share');

${modelName}.meta = {
    columns: [
        {name: 'name'}
    ],
    hasOne: [],
    hasMany: {
    }
}`;
return tmpl};


function fileName(str) {
    return _.chain(str)
        .snakeCase()
        .split('_')
        .join('.')
        .value() + '.js';
}

function className(str) {
    return _.chain(str)
        .snakeCase()
        .split('_')
        .map(part => _.capitalize(part))
        .join('')
        .value();
}

function writeFile(code) {
    const fs = require('fs');
    fs.writeFile("./model/" + code.name, code.code, function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("Done...");
    });
}

function generateModel(name) {
    let model = {
        name: fileName(name),
        code: template(className(name))
    }
    writeFile(model);
}


module.exports = {
    generateModel
}