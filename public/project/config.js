(function () {
    angular
        .module("EventSmart")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "views/home/home.view.client.html",
                controller: "HomePageController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })
            .when("/event/:eventName/location/:location", {
                templateUrl: "views/event/event-search-list.view.client.html",
                controller: "EventSearchListController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })
            .when("/event/:eventId", {
                templateUrl: "views/event/event-detail.view.client.html",
                controller: "EventDetailController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })
            .when("/user/profile", {
                templateUrl: "views/user/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    loggedIn: permitEntry
                }
            })
            .when("/user/project/profile/:username", {
                templateUrl: "views/user/member-profile.view.client.html",
                controller: "MemberProfileController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })
            .when("/admin",{
                templateUrl: "views/admin/admin.view.client.html",
                controller: "AdminController",
                controllerAs: "model",
                resolve: {
                    loggedIn: permitEntry
                }
            })
        
    }

    function permitEntry(UserService, $location, $q, $rootScope){
        var deferred = $q.defer();
        UserService
            .loggedIn()
            .then(
                function(response){
                    var user = response.data;
                    if(user == '0'){
                        $rootScope.currentUser = null;
                        deferred.reject();
                        $location.url("/");
                    }else{
                        $rootScope.currentUser = user;
                        deferred.resolve();
                    }
                },
                function(error){
                    $location.url("/");
                }
            );
        return deferred.promise;
    }

    function checkLoggedIn(UserService, $location, $q, $rootScope) {
        var deferred = $q.defer();
        UserService
            .loggedIn()
            .then(
                function (response) {
                    var user = response.data;
                    if (user == '0') {
                        $rootScope.currentUser = null;
                    } else {
                        $rootScope.currentUser = user;
                    }

                    deferred.resolve();
                },
                function (error) {
                    $location.url("/");
                }
            );
        return deferred.promise;
    }
})();