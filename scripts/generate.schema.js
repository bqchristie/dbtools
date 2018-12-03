let _ = require('lodash');
let requireDir = require('require-dir');
let DBUtil = require('../db/dbutil');
let model = requireDir('../model');
let modelNames = _.keys(model).filter(key => !_.startsWith(key,'_'));



DBUtil.toggleConstraints(false)
    .then(results => {
        return DBUtil.generateTables(modelNames.map(modelName=>model[modelName]))
    })
    .then(results => {
        return DBUtil.toggleConstraints(true);
    })
    .catch( err => {console.log(err)});
