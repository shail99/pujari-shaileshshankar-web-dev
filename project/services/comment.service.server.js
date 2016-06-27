module.exports = function(app,models){

    var commentModel = models.commentModel;
    app.post("/project/comment", createComment);
    app.get("/project/comment/:eventId", findCommentByEventId);
    app.delete("/project/comment/:commentId", removeComment);

    function createComment(request,response){
        var newComment = request.body;
        var userId = request.params.userId;
        commentModel
            .createComment(newComment)
            .then(
                function(comment){
                    response.json(comment);
                },
                function(error){
                    response.statusCode(404).send(error);
                }
            );
    }

    function findCommentByEventId(request,response){
        var eventId = request.params.eventId;
        commentModel
            .findCommentByEventId(eventId)
            .then(
                function(comments){
                    response.json(comments);
                },
                function(error){
                    response.statusCode(404).send(error);
                }
            )
    }

    function removeComment(request,response){
        var commentId = request.params.commentId;

        commentModel
            .removeComment(commentId)
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