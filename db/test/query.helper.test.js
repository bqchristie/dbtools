let qh = require('../query.helper.js')
let User  = require('../../model/user');
let Role  = require('../../model/role');
let RolePermission  = require('../../model/role.permission');
let List  = require('../../model/list');
let ListItem  = require('../../model/list.item');
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


test('findBy', () => {
    let sql = qh.find(User, {username: 'bob', password:'ganoosh'});
    console.log(sql);
    expect(true).toBe(true);
})

test('findRelatedObjects', () => {
    let list= new List({id:1});
    let sql = qh.findRelatedObjects(list, ListItem, false);
    console.log(sql);
    expect(true).toBe(true);
})


test('findRelatedObjectWithJoin', () => {
    let role= new Role({id:1});

    let sql = qh.findRelatedObjects(role, RolePermission, true);
    console.log(sql);
    expect(true).toBe(true);
})