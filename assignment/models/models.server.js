/*
will be entry point into the database connection to interact with the database
 */
module.exports = function () {

    // import mongoose library
    var mongoose = require("mongoose");
    mongoose.connect('mongodb://localhost/cs5610summer1');

    var models = {
        userModel: require("./user/user.model.server.js")()
        // TODO: add all the other models:
    };
    return models;
};