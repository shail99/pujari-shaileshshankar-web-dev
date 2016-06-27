module.exports = function () {
    var mongoose = require("mongoose");
    var EventSchema = mongoose.Schema({
        eventId: String,
        eventName: String,
        eventImage: String,
        eventUrl: String,
        eventStart: String,
        dateCreated: {type: Date, default: Date.now},
    }, {collection: "project.event"});
    return EventSchema;
};