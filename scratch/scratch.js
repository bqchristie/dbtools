let _ = require('lodash')

let str = ('test_idol_id')
str =  _.replace(str,/_id$/gm,'')

console.log(str)
