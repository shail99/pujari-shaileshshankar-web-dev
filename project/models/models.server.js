/*
 will be entry point into the database connection to interact with the database
 */
module.exports = function () {
    var models = {
        //userModel: require("./user/user.model.server.js")()
        commentModel: require("./comment/comment.model.server.js")(),
        eventModel: require("./event/event.model.server.js")(),
        followModel: require("./follow/follow.model.server.js")()
    };
    return models;
};
