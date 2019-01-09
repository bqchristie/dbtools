let qh = require('../query.helper.js')
let User  = require('../../model/user');
let Product  = require('../../model/product');
let Role  = require('../../model/role');
let RolePermission  = require('../../model/role.permission');
let List  = require('../../model/list');
let ListItem  = require('../../model/list.item');
let sqlFormat = require('sql-formatter');

// Make the tests run without throwing exceptions
let iconv = require('iconv-lite');
let encodings = require('iconv-lite/encodings');

test('whats your problem', ()=> {
    expect(true).toBe(true);
});

test('createTableDDL',()=> {
    let ddl = sqlFormat.format(qh.createTableDDL(Product));
    console.log(ddl);
    expect(true).toBe(true);
});


test('getBulkInsertStatement', ()=> {
    let roles = [new Role({id:1,name:'test'})]
    let users = [User.fake(roles),User.fake(roles)];
    let sql = sqlFormat.format(qh.getBulkInsertStatement(users));
    console.log(sql);
    expect(true).toBe(true);
})


test('find', () => {
    let sql = qh.find(User, {email: 'bob@test.com', password:'ganoosh'});
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


test('mapDataType', ()=> {
    let type = qh.mapDataType()
    expect(type).toBe('varchar(100)');
})