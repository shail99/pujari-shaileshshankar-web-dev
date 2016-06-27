module.exports = function (app, models) {

    var eventModel = models.eventModel;
    app.post("/project/event", createEvent);
    app.get("/project/event/:eventId", findEventByEventIdFromDb);
    app.get("/project/profile/event/:id", findEventByIdFromDb);
     /*app.put("/api/website/:websiteId", updateWebsite);
     app.delete("/api/website/:websiteId", deleteWebsite);*/

    /*function searchEvents(request,response){
     var event = request.body;
     var urlBase = "https://www.eventbriteapi.com/v3/events/search/?q=SEARCH_TEXT&token=2ML7YE6OJPNSP5RANX4H";
     var url = urlBase
     .replace("SEARCH_TEXT", event.event);
     return $http.get(url);
     }*/
    function createEvent(request, response) {
        var newEvent = request.body;
        eventModel
            .findEventByEventId(newEvent.eventId)
            .then(
                function (event) {
                    if (event) {
                        response.json(event);
                    }
                    else{
                        return eventModel.createEvent(newEvent);
                    }
                },
                function (error) {
                    response.statusCode(404).send(error);
                }
            )
            .then(
                function(event){
                    response.json(event);
                },
                function(error){
                    response.status(400).send(error);
                }
            )
    }

    function findEventByEventIdFromDb(request, response){
        var eventId = request.params.eventId;
        eventModel
            .findEventByEventId(eventId)
            .then(
                function(event){
                    response.json(event);
                },
                function (error) {
                    response.statusCode(404).send(error);
                }
            );
    }

    function findEventByIdFromDb(request,response){
        var id = request.params.id;
        eventModel
            .findEventById(id)
            .then(
                function(event){
                    response.json(event);
                },
                function (error) {
                    response.statusCode(404).send(error);
                }
            );
    }

    function findAllWebsitesForUser(request, response) {
        var userId = request.params.userId;
        websiteModel
            .findAllWebsitesForUser(userId)
            .then(
                function (websites) {
                    response.json(websites);
                }
            );
    }

    function findWebsiteById(request, response) {
        var websiteId = request.params.websiteId;
        websiteModel
            .findWebsiteById(websiteId)
            .then(
                function (website) {
                    response.json(website);
                },
                function (error) {
                    response.statusCode(404).send(error);
                }
            )
    }

    function updateWebsite(request, response) {
        var websiteId = request.params.websiteId;
        var newWebsite = request.body;

        websiteModel
            .updateWebsite(websiteId, newWebsite)
            .then(
                function (success) {
                    response.send(200);
                },
                function (error) {
                    response.statusCode(404).send(error);
                }
            )
    }

    function deleteWebsite(request, response) {
        var websiteId = request.params.websiteId;

        websiteModel
            .deleteWebsite(websiteId)
            .then(
                function (success) {
                    response.send(200);
                },
                function (error) {
                    response.statusCode(404).send(error);
                }
            )
    }
};