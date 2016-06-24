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
                    loggedIn: checkLoggedIn
                }
            })
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
                        //deferred.reject();
                        //$location.url("/login");
                    } else {
                        $rootScope.currentUser = user;
                        //deferred.resolve();
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