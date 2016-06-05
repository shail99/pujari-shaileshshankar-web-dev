module.exports = function (app) {
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
        user._id = (new Date()).getTime()+"";
        users.push(user);
        response.send(user);
    }

    function findUserByUsername(username,response){
        for(var i in users){
            if(users[i].username === username){
                response.send(users[i]);
                return;
            }
        }
        response.send({});
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
        for(var i in users){
            if(users[i].username === username && users[i].password === password){
                response.send(users[i]);
                return;
            }
        }
        response.send({});
    }

    function findUserById(request,response){
        var id = request.params.userId;
        for(var i in users) {
            if(users[i]._id === id) {
                response.send(users[i]);
                return;
            }
        }
        response.send({});
    }

    function updateUser(request,response){
        var id = request.params.userId;
        var newUser = request.body;
        for(var i in users) {
            if(users[i]._id === id) {
                users[i].firstName = newUser.firstName;
                users[i].lastName = newUser.lastName;
                response.send(200);
                return;
            }
        }
        response.send(400);
    }

    function deleteUser(request,response){
        var id = request.params.userId;
        for(var i in users) {
            if (users[i]._id === id) {
                users.splice(i, 1);
                response.send(200);
                return;
            }
        }
        response.send(400);
    }
};