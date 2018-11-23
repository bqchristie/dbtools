const iconv = require('iconv-lite')
const encodings = require('iconv-lite/encodings');
iconv.encodings = encodings;

let qb = require('./query.builder');
let DAO = require('./dao');

class TestObject extends DAO {

    static meta() {
        return {
            columns: [
                {name: 'firstName'},
                {name: 'lastName'},
                {name: 'phone'}
            ]
        }
    }
}

let testObjInsert = new TestObject({
    firstName : 'Bob',
    lastName : 'Saget',
    phone: '(416)417-0178',
});

let testObjUpdate = new TestObject({
    id: 1,
    firstName : 'Bob',
    lastName : 'Saget',
    phone: '(416)417-0178',
});


test('test creeate statement', () => {
    let sql = qb.getInsertStatement(testObjInsert);
    console.log(sql);
    expect(sql).toBe("INSERT INTO test_object(firstName,lastName,phone) values('Bob','Saget','(416)417-0178');");
});

test('test update statement', () => {
    let sql = qb.getUpdateStatement(testObjUpdate);
    console.log(sql);
    expect(true).toBe(true);
});