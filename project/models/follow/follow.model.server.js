/*
Will hold all the user related crud operations
 */
module.exports = function () {

    var mongoose = require("mongoose");
    var FollowSchema = require("./follow.schema.server.js")();
    // create entity manager i.e. object that provides api to talk to db
    var Follow = mongoose.model("Follow",FollowSchema);
    var api = {
        createUser: createUser,
        findUserByUsername: findUserByUsername,
        updateUser: updateUser,
        findAllUsers: findAllUsers
    };
    return api;
    
    function createUser(event) {
        return Follow.create(event);
    }

    function findUserByUsername(username){
        return Follow.findOne({"username": username});
    }

    function updateUser(userId, newUser){
        delete newUser._id;
        return Follow
            .update({_id: userId},{
                $set: newUser
            })
    }

    function findAllUsers(){
        return Follow.find();
    }
};