module.exports = function () {

    var mongoose = require("mongoose");
    var EventSchema = require("./event.schema.server.js")();
    // create entity manager i.e. object that provides api to talk to db
    var Event = mongoose.model("Event",EventSchema);
    var api = {
        createEvent: createEvent,
        findEventByEventId: findEventByEventId,
        findEventById: findEventById
    };
    return api;
    
    function createEvent(event) {
        return Event.create(event);
    }

    function findEventByEventId(eventId){
        return Event.findOne({"eventId": eventId});
    }

    function findEventById(id){
        return Event.findOne({"_id": id});
    }
    function findCommentByUserName(username){
        return Comment.find({"username": username})
    }

    function findCommentByEventId(eventId){
        return Comment.find({"eventId": eventId}).sort({dateCreated: 1});
    }

    function removeComment(commentId){
        return Comment.remove({_id: commentId});
    }
};