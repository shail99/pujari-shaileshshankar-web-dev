/*
describe how all the users look like
 */

module.exports = function () {
    var mongoose = require("mongoose");
    var CommentSchema = mongoose.Schema({
        username: {type: String, required: true},
        url: String,
        commentText: String,
        eventId: String,
        dateCreated: {type: Date, default: Date.now},
    }, {collection: "project.comment"});
    
    return CommentSchema;
};