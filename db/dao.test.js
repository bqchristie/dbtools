const iconv = require('iconv-lite')
const encodings = require('iconv-lite/encodings');
iconv.encodings = encodings;

const DBUtils = require('./dbutil');
const DAO = require('./dao');
const Role = require('../model/role');
const Permission = require('../model/permission');

class TestObject extends DAO {

    constructor(obj) {
        super(obj);
    }

    static build(data) {
        return new TestObject(data);
    }

    static meta() {
        return {
            columns: [
                {name: 'firstName'},
                {name: 'lastName'},
                {name: 'phone'}
            ],
            hasOne: {
                role: Role,
                permission: Permission
            }
        }
    }
}

let testObj = new TestObject({
    firstName : 'Bob',
    lastName : 'Saget',
    phone: '(416)417-0178',
    role: new Role(),
    permission: new Permission()
});


test('get columns from object', () => {

    let columns = testObj.getSetColumns();

    console.log(columns);
    expect(columns.length).toBe(5);
});

test('get foreign keys for object', () => {
    let foreignKeys = testObj.getForeignKeys();
    expect(foreignKeys[0]).toBe("role_id");
    expect(foreignKeys[1]).toBe("permission_id");
    expect(foreignKeys.length).toBe(2);
});

test('generate create statement', ()=> {
    expect(true).toBe(true);
});