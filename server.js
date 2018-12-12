require('dotenv').config()
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var cors  = require('cors');
const http = require('http');
const https = require('https');
const fs = require('fs');
const jwt = require('jsonwebtoken');
var bodyParser = require('body-parser');
var config = require('./config/config');
let openRoutes = require('./routes/auth')
let secureRoutes = require('./routes/index');
let verifyToken = require('./routes/verify.token');


console.log(process.env.ENVIRONMENT);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'))
app.use('/auth', openRoutes);
app.use('/api', verifyToken, secureRoutes);

var httpPort = process.env.HTTP_PORT;        // set our port
var httpsPort = process.env.HTTPS_PORT;        // set our port


const httpServer = http.createServer(app);


httpServer.listen(httpPort, () => {
    console.log('HTTP Server running on port ' + httpPort);
});


if(httpsPort) {
    // Certificate
    const privateKey = fs.readFileSync('/etc/letsencrypt/live/api.fuudlist.com/privkey.pem', 'utf8');
    const certificate = fs.readFileSync('/etc/letsencrypt/live/api.fuudlist.com/cert.pem', 'utf8');
    const ca = fs.readFileSync('/etc/letsencrypt/live/api.fuudlist.com/chain.pem', 'utf8');

    const credentials = {
        key: privateKey,
        cert: certificate,
        ca: ca
    };

    const httpsServer = https.createServer(credentials, app);

    httpsServer.listen(httpsPort, () => {
        console.log('HTTPS Server running on port ' + httpsPort);
    });
}

