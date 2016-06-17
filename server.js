var express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');

var app = express();
 
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(session({ secret: process.env.SESSION_SECRET }));

app.use(passport.initialize());
app.use(passport.session());

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

//require ("./test/app.js")(app);

var ipaddress = process.env.OPENSHIFT_NODEJS_IP;
var port      = process.env.OPENSHIFT_NODEJS_PORT || 3000;

var assignment = require("./assignment/app.js");
assignment(app);

var home = require("./home/app.js");
home(app);

app.listen(port, ipaddress);
