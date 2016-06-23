module.exports = function (app,projectUserModel,passport) {

    var models = require("./models/models.server")();

    require("./services/event.service.server.js")(app,models);
    require("./services/user.service.server.js")(app,projectUserModel,passport);
    /*require("./services/page.service.server.js")(app,models);
    require("./services/widget.service.server.js")(app,models);*/
};