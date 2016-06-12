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
        findUserById: findUserById,
        findUserByCredentials: findUserByCredentials,
        findUserByUsername: findUserByUsername,
        updateUser: updateUser,
        deleteUser: deleteUser
    };
    return api;
    
    function createUser(user) {
        return User.create(user);
    }

    function findUserById(userId){
        return User.findById(userId);
    }

    function findUserByCredentials(username,password) {
        return User.findOne({username: username, password: password});
    }

    function findUserByUsername(username) {
        return User.findOne({username: username});
    }

    function updateUser(userId, newUser){
        delete newUser._id;
        return User
            .update({_id: userId},{
                $set: newUser
            })
    }

    function deleteUser(userId){
        return User.remove({_id: userId});
    }
};