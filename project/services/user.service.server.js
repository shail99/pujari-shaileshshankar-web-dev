//var passport = require('passport');
//var LocalStrategy = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var bcrypt = require("bcrypt-nodejs");

var multer = require('multer'); // npm install multer --save
var upload = multer({ dest: __dirname+'/../../public/img-upload' });

module.exports = function (app, userModel, passport) {

    //var userModel = models.userModel;
    app.post ("/profile/uploads", upload.single('myFile'), uploadImage);
    app.get("/auth/google", passport.authenticate('google',{ scope: ['profile','email'] }));
    app.get("/auth/google/callback", passport.authenticate('google',{
        successRedirect: '/project/#/',
        failureRedirect: '/project/#/'
    }));
    app.get("/project/api/user/:username",findUserByUsername);
    app.post("/api/user",createUser);
    app.get("/api/user", getUsers);
    app.post("/api/login",passport.authenticate('project'), login);
    app.get("/project/user/:userId",findUserById);
    app.put("/project/user/:userId",updateUser);
    app.delete("/api/user/:userId",deleteUser);
    app.post("/api/logout",logout);
    app.get("/api/loggedIn", loggedIn);
    app.post("/api/register", register);

//    passport.use(new LocalStrategy(localStrategy));
//    passport.serializeUser(serializeUser);
//    passport.deserializeUser(deserializeUser);

    var googleConfig = {
        clientID     : process.env.GOOGLE_CLIENT_ID,
        clientSecret : process.env.GOOGLE_CLIENT_SECRET,
        callbackURL  : process.env.GOOGLE_CALLBACK_URL
    };

    passport.use(new GoogleStrategy(googleConfig,googleLogin));

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

    function googleLogin(token, refreshToken, profile, done){
            userModel
                .findUserByGoogleId(profile.id)
                .then(
                    function(user) {
                        if(user) {
                            return done(null, user);
                        } else {
                            var email = profile.emails[0].value;
                            var emailParts = email.split("@");
                            var newGoogleUser = {
                                username:  emailParts[0],
                                firstName: profile.name.givenName,
                                lastName:  profile.name.familyName,
                                email:     email,
                                google: {
                                    id:    profile.id,
                                    token: token
                                }
                            };
                            return userModel.createUser(newGoogleUser);
                        }
                    },
                    function(err) {
                        if (err) { return done(err); }
                    }
                )
                .then(
                    function(user){
                        return done(null, user);
                    },
                    function(err){
                        if (err) { return done(err); }
                    }
                );
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

    function findUserByUsername(request,response){
        var username = request.params.username;
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

    function uploadImage(request, response) {
        
        var userId        = request.body.userId;
        console.log(userId);
        var myFile        = request.file;

        if(myFile) {
            var originalname = myFile.originalname; // file name on user's computer
            var filename = myFile.filename;     // new file name in upload folder
            var path = myFile.path;         // full path of uploaded file
            var destination = myFile.destination;  // folder where file is saved to
            var size = myFile.size;
            var mimetype = myFile.mimetype;

            var user = {
                url : "/img-upload/" + filename
            };
            userModel
                .updateUser(userId,user)
                .then(
                    function(success){
                        response.send(200);
                    },
                    function(error){
                        response.statusCode(404).send(error);
                    }
                );
            response.redirect("/project/#/user/profile");
        }else{
            response.redirect("/project/#/user/profile");
        }
    }
};