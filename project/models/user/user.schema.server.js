/*
describe how all the users look like
 */

module.exports = function () {
    var mongoose = require("mongoose");
    var UserSchema = mongoose.Schema({
        username: {type: String, required: true},
        password: String,
        firstName: String,
        google:{
            token: String,
            id: String,
            displayName: String
        },
        role: {type: String, default: 'user'},
        url: String,
        lastName: String,
        linkedin: String,
        facebooklink: String,
        employed: String,
        company: String,
        date: String,
        description: String,
        email: String,
        type: {type: String, default: 'member'},
        dateCreated: {type: Date, default: Date.now},
        eventsLiked: [{type: mongoose.Schema.Types.ObjectId, ref: 'Event'}]
    }, {collection: "project.user"});
    
    return UserSchema;
};