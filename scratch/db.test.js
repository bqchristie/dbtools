let _ = require('lodash');
let faker = require('faker');


let Role = require('../model/role');
let User = require('../model/user')


async function loadData(){
    let role = await Role.findById(1);
    console.log(role);

    let user = await User.findById(1);
    console.log(user);
    process.exit(0);
}


loadData();





