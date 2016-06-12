module.exports = function(app, models){
    var multer = require('multer'); // npm install multer --save
    var upload = multer({ dest: __dirname+'/../../public/uploads' });

    var widgetModel = models.widgetModel;

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
    app.post ("/api/uploads", upload.single('myFile'), uploadImage);

    function createWidget(request,response){
        var pageId = request.params.pageId;
        var newWidget = request.body;
        widgetModel
            .createWidget(pageId, newWidget)
            .then(
                function(widget){
                    response.json(widget);
                },
                function(error){
                    response.statusCode(404).send(error);
                }
            )

    }

    function findAllWidgetsForPage(request,response){
        var pageId = request.params.pageId;
        var widgetsForPage = [];
        widgetModel
            .findAllWidgetsForPage(pageId)
            .then(
                function(widgets){
                    response.json(widgets);
                }
            );
    }

    function findWidgetById(request,response){
        var widgetId = request.params.widgetId;
        widgetModel
            .findWidgetById(widgetId)
            .then(
                function(widget){
                    response.json(widget);
                },
                function(error){
                    response.statusCode(404).send(error);
                }
            );
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

    function uploadImage(request, response) {

        var widgetId      = request.body.widgetId;
        var width         = request.body.width;
        var userId        = request.body.userId;
        var websiteId     = request.body.websiteId;
        var pageId        = request.body.pageId;
        var myFile        = request.file;

        if(myFile) {
            var originalname = myFile.originalname; // file name on user's computer
            var filename = myFile.filename;     // new file name in upload folder
            var path = myFile.path;         // full path of uploaded file
            var destination = myFile.destination;  // folder where file is saved to
            var size = myFile.size;
            var mimetype = myFile.mimetype;

            for (var i in widgets) {
                if (widgets[i]._id === widgetId) {
                    widgets[i].url = "/uploads/" + filename;
                    if(width){
                        widgets[i].width = width;
                    }else{
                        widgets[i].width = "100%";
                    }

                }
            }
            response.redirect("/assignment/#/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId);
        }else{
            response.redirect("/assignment/#/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId);
        }


    }

};