module.exports = function (app) {
    require("./services/mail.service.server.js")(app);
};