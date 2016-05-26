/**
 * Created by shaileshpujari on 5/25/16.
 */

(function(){
    angular
        .module("WebAppMaker")
        .config(Config);

    function Config($routeProvider){
        $routeProvider
            .when("/login", {
                templateUrl: "views/user/login.view.client.html"
            })
            .when("/register", {
                templateUrl: "views/user/register.view.client.html"
            })
            .when("/profile", {
                templateUrl: "views/user/profile.view.client.html"
            });

    }
})();
