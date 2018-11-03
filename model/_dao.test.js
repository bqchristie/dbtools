const DAO= require('./_dao');
const Role = require('./role');
const Permission = require('./permission');

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

    let columns = testObj.getColumns();

    console.log(columns);
    expect(columns.length).toBe(5);
});


test('get foregn keys for object', () =>{
    let foreignKeys = testObj.getForeignKeys();
    expect(foreignKeys[0]).toBe("role_id");
    expect(foreignKeys[1]).toBe("permission_id");
    expect(foreignKeys.length).toBe(2);
});

