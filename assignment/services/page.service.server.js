module.exports = function(app,models){

    var pageModel = models.pageModel;
    app.post("/api/website/:websiteId/page",createPage);
    app.get("/api/website/:websiteId/page",findAllPagesForWebsite);
    app.get("/api/page/:pageId",findPageById);
    app.put("/api/page/:pageId",updatePage);
    app.delete("/api/page/:pageId",deletePage);

    function createPage(request,response){
        var newPage = request.body;
        var websiteId = request.params.websiteId;
        pageModel
            .createPage(websiteId, newPage)
            .then(
                function(page){
                    response.json(page);
                },
                function(error){
                    response.statusCode("404").send(error);
                }
            );
    }

    function findAllPagesForWebsite(request,response){
        var websiteId = request.params.websiteId;
        pageModel
            .findAllPagesForWebsite(websiteId)
            .then(
                function(pages){
                    response.json(pages);
                }
            );
    }

    function findPageById(request,response) {
        var pageId = request.params.pageId;
        pageModel
            .findPageById(pageId)
            .then(
                function(page){
                    response.json(page);
                },
                function(error){
                    response.statusCode(404).send(error);
                }
            );
    }

    function updatePage(request,response){
        var pageId = request.params.pageId;
        var page = request.body;
        pageModel
            .updatePage(pageId,page)
            .then(
                function(success){
                    response.send(200);
                },
                function(error){
                    response.statusCode(404).send(error);
                }
            )
    }

    function deletePage(request,response){
        var pageId = request.params.pageId;
        pageModel
            .deletePage(pageId)
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