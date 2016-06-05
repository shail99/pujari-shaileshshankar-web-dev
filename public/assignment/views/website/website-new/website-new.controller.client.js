/**
 * Created by shaileshpujari on 5/26/16.
 */
(function(){
   angular
       .module("WebAppMaker")
           .controller("NewWebsiteController",NewWebsiteController);

    function NewWebsiteController($routeParams, WebsiteService,$location){
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.createWebsite = createWebsite;

        function createWebsite(websiteName){
            var newWebsite = {
              name: websiteName
            };
            WebsiteService.createWebsite(vm.userId, newWebsite)
                .then(
                    function(response){
                        $location.url("/user/"+vm.userId+"/website");
                    },
                    function(error){
                        vm.error = "Not able to create a website for the user";
                    });
        }
    }
})();