module.exports = function(app, models){
    var multer = require('multer'); // npm install multer --save
    var upload = multer({ dest: __dirname+'/../../public/uploads' });

    var widgetModel = models.widgetModel;
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
        widgetModel
            .updateWidget(widgetId,widget)
            .then(
                function(success){
                    response.send(200);
                },
                function(error){
                    response.statusCode(404).send(error);
                }
            )
    }

    function deleteWidget(request,response){
        var widgetId = request.params.widgetId;
        widgetModel
            .deleteWidget(widgetId)
            .then(
                function(success){
                    response.send(200);
                },
                function(error){
                    response.statusCode(404).send(error);
                }
            )
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

            widgetModel
                .findWidgetById(widgetId)
                .then(
                    function(widget){
                        widget.url = "/uploads/" + filename;
                        if(width){
                            widget.width = width;
                        }else{
                            widget.width = "100%";
                        }
                        widgetModel
                            .updateWidget(widgetId,widget)
                            .then(
                                function(success){
                                    response.send(200);
                                },
                                function(error){
                                    response.statusCode(404).send(error);
                                }
                            )
                    },
                    function(error){
                        response.statusCode(404).send(error);
                    }
                );
            response.redirect("/assignment/#/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId);
        }else{
            response.redirect("/assignment/#/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId);
        }


    }

};