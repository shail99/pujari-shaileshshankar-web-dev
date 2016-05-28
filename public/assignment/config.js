/**
 * Created by shaileshpujari on 5/25/16.
 */

(function(){
    angular
        .module("WebAppMaker")
        .config(Config);

    function Config($routeProvider){
        $routeProvider
            .when("/",{
                redirectTo: "/login"
            })
            .when("/login", {
                templateUrl: "views/user/login/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "views/user/register/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/user/:uid", {
                templateUrl: "views/user/profile/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model"
            })
            .otherwise({
                redirectTo: "/login"
            });

    }
})();
