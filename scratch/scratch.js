let _ = require('lodash')


var tests = [' / ', '/', '    / ','4 / 22 ','3 / ', '3/ ', '', ' ', null]

tests.forEach(test=>{
    var res = _.replace(test,/[ /]/gm, '').length === 0;
    console.log(res);

})

//check for null or when the only chars are space or /
//_.replace(str,/[ /]/gm, '').length === 0