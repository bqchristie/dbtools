let _ = require('lodash');
let faker = require('faker');

let User = require('../model/user');
let Role = require('../model/role');
let RoleRight = require('../model/role.right');


User.findById(1).then(user =>{
    console.log(user.firstName);
    console.log(user);

});