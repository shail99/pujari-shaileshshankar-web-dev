/*
will be entry point into the database connection to interact with the database
 */
module.exports = function () {

    // import mongoose library
    var mongoose = require("mongoose");
    mongoose.connect('mongodb://localhost/cs5610summer1');

    var models = {
        userModel: require("./user/user.model.server.js")(),
        websiteModel: require("./website/website.model.server.js")(),
        pageModel: require("./page/page.model.server")(),
        widgetModel: require("./widget/widget.model.server")()
    };
    return models;
};