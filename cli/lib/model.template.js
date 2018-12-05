const _ = require('lodash');

function getTemplate(name) {
    let modelName = _.capitalize(_.camelCase(name));
    const template =
`var DAO = require('../db/dao');

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
}`
    return {name: name, code: template};

}

function writeFile(code){
    let filename = _.camelCase(code.name) + '.js';
    const fs = require('fs');
    fs.writeFile("../../model/"+ filename, code.code, function(err) {
        if(err) {
            return console.log(err);
        }

        console.log("The file was saved!");
    });
}

let code = getTemplate('donut');
console.log(code.name);

writeFile(code)