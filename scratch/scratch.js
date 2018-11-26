const _ = require('lodash');

var name = 'Person';


console.log(_.snakeCase(name));

name = 'PersonCategory';

console.log(_.snakeCase(name));

name = 'PersonCategoryThing';

console.log(_.snakeCase(name));