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
                redirectTo: "/index.html"
            })
            .when("/user/:userId/website/:wid/page/:pid/widget/:wgid/flickr",{
                templateUrl: "views/widget/widget-edit/widget-flickr-search.view.client.html",
                controller: "FlickrImageSearchController",
                controllerAs: "model"
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
            .when("/user", {
                templateUrl: "views/user/profile/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve:{
                    loggedIn: checkLoggedIn
                }
            })
            .when("/user/:userId/website", {
                templateUrl: "views/website/website-list/website-list.view.client.html",
                controller: "WebsiteListController",
                controllerAs: "model",
                resolve:{
                    loggedIn: checkLoggedIn
                }
            })
            .when("/user/:userId/website/new", {
                templateUrl: "views/website/website-new/website-new.view.client.html",
                controller: "NewWebsiteController",
                controllerAs: "model",
                resolve:{
                    loggedIn: checkLoggedIn
                }
            })
            .when("/user/:userId/website/:wid", {
                templateUrl: "views/website/website-edit/website-edit.view.client.html",
                controller: "EditWebsiteController",
                controllerAs: "model",
                resolve:{
                    loggedIn: checkLoggedIn
                }
            })
            .when("/user/:userId/website/:wid/page", {
                templateUrl: "views/page/page-list/page-list.view.client.html",
                controller: "PageListController",
                controllerAs: "model",
                resolve:{
                    loggedIn: checkLoggedIn
                }
            })
            .when("/user/:userId/website/:wid/page/new", {
                templateUrl: "views/page/page-new/page-new.view.client.html",
                controller: "NewPageController",
                controllerAs: "model",
                resolve:{
                    loggedIn: checkLoggedIn
                }
            })
            .when("/user/:userId/website/:wid/page/:pid", {
                templateUrl: "views/page/page-edit/page-edit.view.client.html",
                controller: "EditPageController",
                controllerAs: "model",
                resolve:{
                    loggedIn: checkLoggedIn
                }
            })
            .when("/user/:userId/website/:wid/page/:pid/widget", {
                templateUrl: "views/widget/widget-list/widget-list.view.client.html",
                controller: "WidgetListController",
                controllerAs: "model",
                resolve:{
                    loggedIn: checkLoggedIn
                }
            })
            .when("/user/:userId/website/:wid/page/:pid/widget/new", {
                templateUrl: "views/widget/widget-new/widget-chooser.view.client.html",
                controller: "NewWidgetController",
                controllerAs: "model",
                resolve:{
                    loggedIn: checkLoggedIn
                }
            })
            .when("/user/:userId/website/:wid/page/:pid/widget/:wgid", {
                templateUrl: "views/widget/widget-edit/widget-edit.view.client.html",
                controller: "EditWidgetController",
                controllerAs: "model",
                resolve:{
                    loggedIn: checkLoggedIn
                }
            })
            .otherwise({
                redirectTo: "/login"
            });

    }

    function checkLoggedIn(UserService, $location, $q, $rootScope){
        var deferred = $q.defer();
        UserService
            .loggedIn()
            .then(
                function(response){
                    var user = response.data;
                    if(user == '0'){
                        $rootScope.currentUser = null;
                        deferred.reject();
                        $location.url("/login");
                    }else{
                        $rootScope.currentUser = user;
                        deferred.resolve();
                    }
                },
                function(error){
                    $location.url("/login");
                }
            );
        return deferred.promise;
    }
})();
