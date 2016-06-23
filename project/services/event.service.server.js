module.exports = function(app){

    //var websiteModel = models.websiteModel;
    //app.post("/api/events/search", searchEvents);
    /*app.get("/api/user/:userId/website", findAllWebsitesForUser);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/:websiteId", deleteWebsite);*/

    /*function searchEvents(request,response){
        var event = request.body;
        var urlBase = "https://www.eventbriteapi.com/v3/events/search/?q=SEARCH_TEXT&token=2ML7YE6OJPNSP5RANX4H";
        var url = urlBase
            .replace("SEARCH_TEXT", event.event);
        return $http.get(url);
    }*/
    function createWebsite(request,response){
        var newWebsite = request.body;
        var userId = request.params.userId;
        websiteModel
            .createWebsite(userId,newWebsite)
            .then(
                function(website){
                    response.json(website);
                },
                function(error){
                    response.statusCode(404).send(error);
                }
            );
    }

    function findAllWebsitesForUser(request,response){
        var userId = request.params.userId;
        websiteModel
            .findAllWebsitesForUser(userId)
            .then(
                function(websites){
                    response.json(websites);
                }
            );
    }

    function findWebsiteById(request,response){
        var websiteId = request.params.websiteId;
        websiteModel
            .findWebsiteById(websiteId)
            .then(
                function(website){
                    response.json(website);
                },
                function(error){
                    response.statusCode(404).send(error);
                }
            )
    }

    function updateWebsite(request,response){
        var websiteId = request.params.websiteId;
        var newWebsite = request.body;

        websiteModel
            .updateWebsite(websiteId,newWebsite)
            .then(
                function(success){
                    response.send(200);
                },
                function(error){
                    response.statusCode(404).send(error);
                }
            )
    }

    function deleteWebsite(request,response){
        var websiteId = request.params.websiteId;

        websiteModel
            .deleteWebsite(websiteId)
            .then(
                function(success){
                    response.send(200);
                },
                function(error){
                    response.statusCode(404).send(error);
                }
            )
    }
};