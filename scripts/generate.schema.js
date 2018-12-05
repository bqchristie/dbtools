let _ = require('lodash');
let requireDir = require('require-dir');
let DBUtil = require('../db/dbutil');
let model = requireDir('../model');
let modelNames = _.keys(model).filter(key => !_.startsWith(key, '_'));


Promise.resolve()
    .then(result => DBUtil.toggleConstraints(false))
    .then(result => DBUtil.generateTables(modelNames.map(modelName => model[modelName])))
    .then(result => DBUtil.toggleConstraints(true))
    .catch(err => console.log(err))
    .then(() => {
        console.log('done');
        process.exit();
    })
