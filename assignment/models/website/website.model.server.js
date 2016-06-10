module.exports = function () {

    var mongoose = require("mongoose");
    var WebsiteSchema = require("./website.schema.server.js")();
    var Website = mongoose.model("Website",WebsiteSchema);

    var api = {
        findAllWebsitesForUser: findAllWebsitesForUser,
        createWebsite: createWebsite
    }
    return api;

    function findAllWebsitesForUser(userId){
        return Website.find({"_user": userId});
    }
    
    function createWebsite(userId, newWebsite){
        newWebsite._user = userId;
        return Website.create(newWebsite);
    }
};