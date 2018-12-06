let qh = require('../query.helper.js')
let User  = require('../../model/user');
let Role  = require('../../model/role');
let sqlFormat = require('sql-formatter');

test('createTableDDL',()=> {
    let ddl = sqlFormat.format(qh.createTableDDL(User));
    console.log(ddl);
    expect(true).toBe(true);
});


test('getBulkInsertStatement', ()=> {
    let roles = [new Role({id:1,name:'test'})]
    let users = [User.fake(roles)];
    let sql = sqlFormat.format(qh.getBulkInsertStatement(users));
    console.log(sql);
    expect(true).toBe(true);
})