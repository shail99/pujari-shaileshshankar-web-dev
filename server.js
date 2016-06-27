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


// import mongoose library
var mongoose = require("mongoose");
var connectionString = 'mongodb://127.0.0.1:27017/cs5610summer1';
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME;
}
mongoose.connect(connectionString);

/*var assignmentUserModel = require("./assignment/models/user/user.model.server.js")();
var projectUserModel = require("./project/models/user/user.model.server.js")();
var security = require("./security.js")(assignmentUserModel,projectUserModel);
var passport = security.getPassport();*/


var project = require("./project/app.js");
project(app);

//var assignment = require("./assignment/app.js");
//assignment(app,assignmentUserModel,passport);

var home = require("./home/app.js");
home(app);

app.listen(port, ipaddress);
