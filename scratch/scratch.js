let _ = require('lodash')


var objs =
[ { "id": 1, "name": "apple juice", "product_category_id": null, "created_date_time": "2018-12-15T15:04:35.000Z", "updated_date_time": null }, { "id": 2, "name": "ground beef", "product_category_id": null, "created_date_time": "2018-12-15T15:04:35.000Z", "updated_date_time": null }, { "id": 3, "name": "bananas", "product_category_id": null, "created_date_time": "2018-12-15T15:04:35.000Z", "updated_date_time": null }, { "id": 4, "name": "apples", "product_category_id": null, "created_date_time": "2018-12-15T15:04:35.000Z", "updated_date_time": null }, { "id": 5, "name": "tin foil", "product_category_id": null, "created_date_time": "2018-12-15T15:04:35.000Z", "updated_date_time": null }, { "id": 6, "name": "sliced bread", "product_category_id": null, "created_date_time": "2018-12-15T15:04:35.000Z", "updated_date_time": null }, { "id": 7, "name": "Asparagus", "product_category_id": null, "created_date_time": "2018-12-15T22:17:24.000Z", "updated_date_time": null }, { "id": 8, "name": "green beans", "product_category_id": null, "created_date_time": "2018-12-16T14:47:28.000Z", "updated_date_time": null }, { "id": 9, "name": "beef jerky", "product_category_id": null, "created_date_time": "2018-12-16T17:33:04.000Z", "updated_date_time": null }, { "id": 10, "name": "lemon", "product_category_id": null, "created_date_time": "2018-12-16T20:56:30.000Z", "updated_date_time": null }, { "id": 11, "name": "beer", "product_category_id": null, "created_date_time": "2018-12-16T20:57:04.000Z", "updated_date_time": null }, { "id": 12, "name": "Crackers", "product_category_id": null, "created_date_time": "2018-12-17T21:32:29.000Z", "updated_date_time": null }, { "id": 13, "name": "dish Soap", "product_category_id": null, "created_date_time": "2018-12-17T21:32:43.000Z", "updated_date_time": null }, { "id": 14, "name": "Kid's toothpaste", "product_category_id": null, "created_date_time": "2018-12-17T21:33:01.000Z", "updated_date_time": null }, { "id": 15, "name": "Honeydew melon", "product_category_id": null, "created_date_time": "2018-12-17T21:34:05.000Z", "updated_date_time": null }, { "id": 16, "name": "Chicken", "product_category_id": null, "created_date_time": "2018-12-17T21:38:19.000Z", "updated_date_time": null }, { "id": 17, "name": "Salmon", "product_category_id": null, "created_date_time": "2018-12-17T21:38:33.000Z", "updated_date_time": null }, { "id": 19, "name": "ketchup", "product_category_id": null, "created_date_time": "2018-12-17T22:05:06.000Z", "updated_date_time": null }, { "id": 20, "name": "ice cream", "product_category_id": null, "created_date_time": "2018-12-17T22:05:52.000Z", "updated_date_time": null }, { "id": 21, "name": "Potatoes", "product_category_id": null, "created_date_time": "2018-12-17T22:06:00.000Z", "updated_date_time": null }, { "id": 22, "name": "yogurt big plain", "product_category_id": null, "created_date_time": "2018-12-17T22:06:55.000Z", "updated_date_time": null }, { "id": 23, "name": "Brocolli", "product_category_id": null, "created_date_time": "2018-12-18T19:49:06.000Z", "updated_date_time": null }, { "id": 24, "name": "Cucumber", "product_category_id": null, "created_date_time": "2018-12-18T19:49:51.000Z", "updated_date_time": null }, { "id": 25, "name": "Spaghetti", "product_category_id": null, "created_date_time": "2018-12-18T19:50:02.000Z", "updated_date_time": null }, { "id": 26, "name": "Pasta Sauce", "product_category_id": null, "created_date_time": "2018-12-18T19:50:13.000Z", "updated_date_time": null }, { "id": 27, "name": "ground pork", "product_category_id": null, "created_date_time": "2018-12-18T19:50:48.000Z", "updated_date_time": null }, { "id": 28, "name": "Chips", "product_category_id": null, "created_date_time": "2018-12-18T20:21:06.000Z", "updated_date_time": null } ]

let huh = _.keyBy(objs, 'id');

console.log(huh[27].name    );