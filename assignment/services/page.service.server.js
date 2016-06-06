module.exports = function(app){
    var pages = [
        { "_id": "321", "name": "Post 1", "websiteId": "456" },
        { "_id": "432", "name": "Post 2", "websiteId": "456" },
        { "_id": "543", "name": "Post 3", "websiteId": "456" }
    ];

    app.post("/api/website/:websiteId/page",createPage);
    app.get("/api/website/:websiteId/page",findAllPagesForWebsite);
    app.get("/api/page/:pageId",findPageById);
    app.put("/api/page/:pageId",updatePage);
    app.delete("/api/page/:pageId",deletePage);

    function createPage(request,response){
        var page = request.body;
        var websiteId = request.params.websiteId;
        page._id = new Date().getTime() + "";
        page.websiteId = websiteId;
        pages.push(page)
        response.json(page);
    }

    function findAllPagesForWebsite(request,response){
        var websiteId = request.params.websiteId;
        var pagesForUser = [];
        for(var i in pages){
            if(pages[i].websiteId === websiteId){
                pagesForUser.push(pages[i]);
            }
        }
        response.json(pagesForUser);
    }

    function findPageById(request,response) {
        var pageId = request.params.pageId;
        for(var i in pages){
            if(pages[i]._id === pageId){
                response.send(pages[i]);
                return;
            }
        }
        response.send({});
    }

    function updatePage(request,response){
        var pageId = request.params.pageId;
        var page = request.body;
        for(var i in pages){
            if(pages[i]._id === pageId){
                pages[i].name = page.name;
                response.send(200);
                return;
            }
        }
        response.send(400);
    }

    function deletePage(request,response){
        var pageId = request.params.pageId;
        for(var i in pages){
            if(pages[i]._id === pageId){
                pages.splice(i,1);
                response.send(200);
                return;
            }
        }
        response.send(400);
    }
};