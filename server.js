var express    = require('express');        // call express
var app        = express();                 // define our app using express
var cors  = require('cors');
var bodyParser = require('body-parser');
var routes = require('./routes');
var config = require('./config/config');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('public'))
app.use('/api', routes);

var port = process.env.PORT || config.apiPort;        // set our port

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);