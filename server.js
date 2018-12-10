let express    = require('express');        // call express
let app        = express();                 // define our app using express
let cors  = require('cors');
let bodyParser = require('body-parser');
let openRoutes = require('./routes/auth')
let secureRoutes = require('./routes/index');
let verifyToken = require('./routes/verify.token');
let config = require('./config/config');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'))
app.use('/auth', openRoutes);
app.use('/api', verifyToken, secureRoutes);

var port = process.env.PORT || config.apiPort;        // set our port

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Api available on port ' + port);