let DBUtil = require('./util/dbutil');
let Person = require('./model/person');
let Role = require('./model/role');
let Right = require('./model/right');

// console.log(model.Person);


DBUtil.generateTables([
    Person
]);