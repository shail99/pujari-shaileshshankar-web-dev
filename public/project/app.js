/**
 * Created by shaileshpujari on 5/25/16.
 */
// IIFEE Design Patthern (Immediately invoked function expression
// (function(){})();
(function () {
    angular
        .module("EventSmart", ["ngRoute","ngRating"])
        .controller("IndexController", IndexController);


    function IndexController($location, $anchorScroll, UserService, $route,$rootScope) {
        var vm = this;
        vm.scrollTo = scrollTo;
        vm.logout = logout;
        vm.searchEvent = searchEvent;
        
        function searchEvent(eventName,SearchEventForm) {
            if($('#srch-term').val() != "")
                $location.url("/event/" + eventName + "/location/boston");
        }

        function scrollTo(id) {
            $location.url("/");
            var old = $location.hash();
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
                        $location.url("/");
                        $route.reload();
                    },
                    function(error){
                        $location.url("/");
                        $route.reload();
                    }
                );
        }
    }
})();
