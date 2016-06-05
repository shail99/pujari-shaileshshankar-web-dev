module.exports = function(app){

    var widgets=[
        { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
        { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "http://lorempixel.com/400/200/"},
        { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
        { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E" },
        { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
    ];

    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/page/:pageId/widget",findAllWidgetsForPage);
    app.get("/api/widget/:widgetId",findWidgetById);
    app.put("/api/widget/:widgetId",updateWidget);
    app.delete("/api/widget/:widgetId",deleteWidget);

    function createWidget(request,response){
        var pageId = request.params.pageId;
        var newWidget = request.body;
        newWidget.pageId = pageId;
        newWidget._id = new Date().getTime()+"";
        widgets.push(newWidget);
        response.json(newWidget);
    }

    function findAllWidgetsForPage(request,response){
        var pageId = request.params.pageId;
        var widgetsForPage = [];
        for (var i in widgets){
            if(widgets[i].pageId === pageId){
                widgetsForPage.push(widgets[i]);
            }
        }
        response.json(widgetsForPage);
    }

    function findWidgetById(request,response){
        var widgetId = request.params.widgetId;
        for (var i in widgets){
            if(widgets[i]._id === widgetId){
                response.json(widgets[i]);
                return;
            }
        }
        response.send(400);
    }

    function updateWidget(request,response){
        var widgetId = request.params.widgetId;
        var widget = request.body;
        for (var i in widgets){
            if(widgets[i]._id === widgetId){
                widgets[i] = widget;
                response.send(200);
                return;
            }
        }
       response.send(400);
    }

    function deleteWidget(request,response){
        var widgetId = request.params.widgetId;
        for (var i in widgets){
            if(widgets[i]._id === widgetId){
                widgets.splice(i,1);
                response.send(200);
                return;
            }
        }
        response.send(400);
    }
};