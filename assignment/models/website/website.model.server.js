module.exports = function () {

    var mongoose = require("mongoose");
    var WebsiteSchema = require("./website.schema.server.js")();
    var Website = mongoose.model("Website",WebsiteSchema);

    var api = {
        findAllWebsitesForUser: findAllWebsitesForUser,
        createWebsite: createWebsite,
        findWebsiteById: findWebsiteById,
        updateWebsite: updateWebsite,
        deleteWebsite: deleteWebsite
    }
    return api;

    function findAllWebsitesForUser(userId){
        return Website.find({"_user": userId});
    }
    
    function createWebsite(userId, newWebsite){
        newWebsite._user = userId;
        return Website.create(newWebsite);
    }

    function findWebsiteById(websiteId){
        return Website.findById(websiteId);
    }
    
    function updateWebsite(websiteId, website){
        delete website._id;
        return Website
            .update({_id: websiteId},{
                $set: website
            })
    }

    function deleteWebsite(websiteId){
        return Website.remove({_id: websiteId});
    }
};