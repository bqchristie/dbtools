let _ = require('lodash');
let faker = require('faker');


let Role = require('../model/role');
let User = require('../model/user')


User.findById(1).then(result=>{
    console.log(result);
}).catch(err=>{
    console.log(err);
})


