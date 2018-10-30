const DAO= require('./_dao');

class Person extends DAO {

    constructor(obj) {
        super(obj);
    }

    static build(data) {
        return new Person(data);
    }

    static meta() {
        return {
            columns: [
                {name: 'firstName'},
                {name: 'lastName'},
                {name: 'phone'}
            ],
            hasOne: {
                role: role
            }
        }
    }
}

let person = new Person({
    firstName : 'Bob',
    lastName : 'Saget',
    phone: '(416)417-0178',
    role: new Person()
});

test('get columns from object', () => {

    let columns = person.getColumns();

    console.log(columns);
    expect(columns.length).toBe(4);
});


test('get foregn keys for object', () =>{
    let foreignKeys = person.getForeignKeys();
    console.log(foreignKeys);
    expect(foreignKeys[0]).toBe("role_id");
    expect(foreignKeys.length).toBe(1);
});

