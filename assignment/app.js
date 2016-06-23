module.exports = function (app,assignmentUserModel,passport) {

    var models = require("./models/models.server")();

    require("./services/user.service.server.js")(app,assignmentUserModel,passport);
    require("./services/website.service.server.js")(app,models);
    require("./services/page.service.server.js")(app,models);
    require("./services/widget.service.server.js")(app,models);
};