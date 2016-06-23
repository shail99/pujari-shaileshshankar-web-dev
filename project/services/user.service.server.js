//var passport = require('passport');
//var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var bcrypt = require("bcrypt-nodejs");

module.exports = function (app, userModel, passport) {

    //var userModel = models.userModel;
    app.get("/auth/facebook", passport.authenticate('facebook'));
    app.get("/auth/facebook/callback", passport.authenticate('facebook',{
        successRedirect: '/assignment/#/user',
        failureRedirect: '/assignment/#/login'
    }));
    app.post("/api/user",createUser);
    app.get("/api/user", getUsers);
    app.post("/api/login",passport.authenticate('project'), login);
    app.get("/api/user/:userId",findUserById);
    app.put("/api/user/:userId",updateUser);
    app.delete("/api/user/:userId",deleteUser);
    app.post("/api/logout",logout);
    app.get("/api/loggedIn", loggedIn);
    app.post("/api/register", register);

//    passport.use(new LocalStrategy(localStrategy));
//    passport.serializeUser(serializeUser);
//    passport.deserializeUser(deserializeUser);

    var facebookConfig = {
        clientID     : process.env.FACEBOOK_CLIENT_ID,
        clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL  : process.env.FACEBOOK_CALLBACK_URL
    };

    passport.use('facebook',new FacebookStrategy(facebookConfig,facebookLogin));

    function localStrategy(username, password, done) {
        userModel
            .findUserByUsername(username)
            .then(
                function(user) {
                    if(user && bcrypt.compareSync(password, user.password)) {
                        done(null, user);
                    } else {
                        done(null, false);
                    }
                },
                function(err) {
                    if (err) { done(err); }
                }
            );
    }

    function facebookLogin(token, refreshToken, profile, done){
        userModel
            .findFacebookUser(profile.id)
            .then(
                function(facebookUser){
                    if(facebookUser){
                        return done(null,facebookUser);
                    }else{
                        facebookUser = {
                            username: profile.displayName.replace(/ /g,''),
                            facebook:{
                                token: token,
                                id: profile.id,
                                displayName: profile.displayName
                            }
                        }
                    }
                    userModel.createUser(facebookUser)
                        .then(
                            function(user){
                                done(null, user);
                            }
                        );
                }
            )
    }

    function loggedIn(request, response){
        if(request.isAuthenticated()){
            response.send(request.user);
        }else{
            response.send('0');
        }
    }

    function logout(request, response){
        request.logout();
        response.send(200);
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

    function register(request, response){
        var user = request.body;
        userModel
            .findUserByUsername(user.username)
            .then(
                function(user){
                    if(user){
                        response.status(400).send("Username already in use");
                    }else{
                        request.body.password = bcrypt.hashSync(request.body.password);
                        return userModel
                                .createUser(request.body);
                    }
                },
                function(error){
                    response.status(400).send(error);
                }
            )
            .then(
                function(user){
                    if(user){
                        request.login(user, function(error){
                            if(error){
                                response.status(400).send(error);
                            }else{
                                response.json(user);
                            }
                        })
                    }
                },
                function(error){
                    response.status(400).send(error);
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