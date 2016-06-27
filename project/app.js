module.exports = function (app) {

    var models = require("./models/models.server")();

    require("./services/event.service.server.js")(app,models);
    require("./services/user.service.server.js")(app,models);
    require("./services/comment.service.server.js")(app,models);
    require("./services/event.service.server.js")(app,models);
    require("./services/member-profile.service.server.js")(app,models);
};