module.exports = function(app){
    var websites = [
        { "_id": "123", "name": "Facebook",    "developerId": "456" },
        { "_id": "234", "name": "Tweeter",     "developerId": "456" },
        { "_id": "456", "name": "Gizmodo",     "developerId": "456" },
        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123" },
        { "_id": "678", "name": "Checkers",    "developerId": "123" },
        { "_id": "789", "name": "Chess",       "developerId": "234" }
    ];

    app.post("/api/user/:userId/website", createWebsite);
    app.get("/api/user/:userId/website", findAllWebsitesForUser);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/:websiteId", deleteWebsite);

    function createWebsite(request,response){
        var newWebsite = request.body;
        var userId = request.params.userId;
        newWebsite._id = new Date().getTime() + "";
        newWebsite.developerId = userId;
        websites.push(newWebsite);
        response.json(newWebsite);
    }

    function findAllWebsitesForUser(request,response){
        var websitesForUser=[];
        var userId = request.params.userId;

        for(var i in websites){
            if(websites[i].developerId === userId){
                websitesForUser.push(websites[i]);
            }
        }
        response.send(websitesForUser);
    }

    function findWebsiteById(request,response){
        var websiteId = request.params.websiteId;
        for(var i in websites){
            if(websites[i]._id === websiteId){
                response.send(websites[i]);
                return;
            }
        }
        response.send({});
    }

    function updateWebsite(request,response){
        var websiteId = request.params.websiteId;
        var newWebsite = request.body;
        for(var i in websites){
            if(websites[i]._id === websiteId){
                websites[i].name = newWebsite.name;
                response.send(200);
                return;
            }
        }
        response.send(400);
    }

    function deleteWebsite(request,response){
        var websiteId = request.params.websiteId;
        for(var i in websites){
            if(websites[i]._id === websiteId){
                websites.splice(i,1);
                response.send(200);
                return;
            }
        }
        response.send(400);
    }
};