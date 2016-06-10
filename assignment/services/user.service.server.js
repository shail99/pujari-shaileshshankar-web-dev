module.exports = function (app, models) {

    var userModel = models.userModel;

    var users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    ];

    app.post("/api/user",createUser);
    app.get("/api/user", getUsers);
    app.get("/api/user/:userId",findUserById);
    app.put("/api/user/:userId",updateUser);
    app.delete("/api/user/:userId",deleteUser);

    function createUser(request,response){
        var user = request.body;
        userModel
            .createUser(user)
            .then(
                function(user){
                    response.json(user);
                },
                function(error){
                    response.statusCode(400).send(error);
                }
            );
    }

    function findUserByUsername(username,response){
        userModel
            .findUserByUsername(username)
            .then(
                function(user){
                    response.json(user);
                },
                function(error){
                    response.statusCode(404).send(error);
                }
            )
    }

    function getUsers(request,response){
        var username = request.query['username'];
        var password = request.query['password'];

        if(username && password){
            findUserByCredentials(username,password,response);
        }else if(username){
            findUserByUsername(username,response);
        }else{
            response.send(users);
        }
    }

    function findUserByCredentials(username,password,response){
        userModel
            .findUserByCredentials(username,password)
            .then(
                function (user) {
                    response.json(user);
                },
                function(error){
                    response.statusCode(404).send(error);
                }
            )
    }

    function findUserById(request,response){
        var id = request.params.userId;
        userModel
            .findUserById(id)
            .then(
                function(user){
                    response.send(user);
                },
                function(error){
                    response.statusCode(404).send(error);
                }
            );
    }

    function updateUser(request,response){
        var id = request.params.userId;
        var newUser = request.body;
        userModel
            .updateUser(id,newUser)
            .then(
                function(stats){
                    response.send(200);
                },
                function(error){
                    response.statusCode(404).send(error);
                }
            );
    }

    function deleteUser(request,response){
        var id = request.params.userId;
        userModel
            .deleteUser(id)
            .then(
                function(stats){
                    response.send(200);
                },
                function(error){
                    response.statusCode(404).send(error);
                }
            );
    }
};