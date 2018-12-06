let User = require('../user');
let Role = require('../role');

test('user faker', () => {

    let roles= [new Role({id:1, name:'test'})]
    let fake = User.fake(roles);

    console.log(fake);
})