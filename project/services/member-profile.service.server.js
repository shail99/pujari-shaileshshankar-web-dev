module.exports = function (app, models) {

    var followModel = models.followModel;
    app.post("/project/follow/user", createUser);
    app.get("/project/follow/user/:username", findUserByUsername);
    app.put("/project/follow/user/:userId", updateUser);
    app.get("/project/follow/users", findAllUsers);
    app.delete("/api/website/:websiteId", deleteWebsite);

    function createUser(request, response) {
        var newUser = request.body;
        followModel
            .createUser(newUser)
            .then(
                function (user) {
                    response.json(user);
                },
                function (error) {
                    response.statusCode(404).send(error);
                }
            );
    }

    function findUserByUsername(request, response) {
        var username = request.params.username;
        followModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    response.json(user);
                },
                function (error) {
                    response.send(error);
                }
            )
    }

    function updateUser(request, response) {
        var userId = request.params.userId;
        var newUser = request.body;

        followModel
            .updateUser(userId, newUser)
            .then(
                function (success) {
                    response.send(200);
                },
                function (error) {
                    response.statusCode(404).send(error);
                }
            )
    }

    function findAllUsers(request, response) {
        followModel.findAllUsers()
            .then(
                function (users) {
                    response.send(users);
                },
                function (error) {
                    response.statusCode(404).send(error);
                }
            );
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