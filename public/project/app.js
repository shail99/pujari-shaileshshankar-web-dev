/**
 * Created by shaileshpujari on 5/25/16.
 */
// IIFEE Design Patthern (Immediately invoked function expression
// (function(){})();
(function () {
    angular
        .module("EventSmart", ["ngRoute"])
        .controller("IndexController", IndexController);


    function IndexController($location, $anchorScroll, UserService, $route) {
        var vm = this;
        vm.scrollTo = scrollTo;
        vm.logout = logout;
        vm.searchEvent = searchEvent;

        function searchEvent(eventName,SearchEventForm) {
            if (SearchEventForm.$valid) {
                $location.url("/event/" + eventName + "/location/boston");
            }
        }

        function scrollTo(id) {
            var old = $location.hash();
            console.log(id);
            $location.hash(id);
            $anchorScroll();
            //reset to old to keep any additional routing logic from kicking in
            $location.hash(old);
        }

        function logout(){
            UserService
                .logout()
                .then(
                    function(response){
                        $route.reload();
                    },
                    function(error){
                        $route.reload();
                    }
                );
        }
    }
})();
