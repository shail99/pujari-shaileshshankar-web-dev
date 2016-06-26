/*
describe how all the users look like
 */

module.exports = function () {
    var mongoose = require("mongoose");
    var FollowSchema = mongoose.Schema({
        username: String,
        followedUser:[{type: String}],
        dateCreated: {type: Date, default: Date.now},
    }, {collection: "project.follow"});
    return FollowSchema;
};