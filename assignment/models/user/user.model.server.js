/*
Will hold all the user related crud operations
 */
module.exports = function () {

    var mongoose = require("mongoose");
    var UserSchema = require("./user.schema.server")();
    // create entity manager i.e. object that provides api to talk to db
    var User = mongoose.model("User",UserSchema);
    var api = {
        createUser: createUser,
        findUserById: findUserById
    };
    return api;
    
    function createUser(user) {
        return User.create(user);
    }

    function findUserById(userId){
        return User.findById(userId);
    }
};