var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function (app, models) {

    var userModel = models.userModel;

    app.post("/api/user",createUser);
    //app.get("/api/user", getUsers);
    app.post("/api/login",passport.authenticate('local'), login);
    app.get("/api/user/:userId",findUserById);
    app.put("/api/user/:userId",updateUser);
    app.delete("/api/user/:userId",deleteUser);

    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);
    function localStrategy(username, password, done) {
        userModel
            .findUserByCredentials(username, password)
            .then(
                function(user) {
                    if(user.username === username && user.password === password) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }

    function login(request, response) {
        var user = request.user;
        response.json(user);
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

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
                    response.statusCode(404).send({});
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