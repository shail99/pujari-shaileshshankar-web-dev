/**
 * Created by shaileshpujari on 5/26/16.
 */
(function(){
   angular
       .module("WebAppMaker")
           .controller("EditWebsiteController",EditWebsiteController);

    function EditWebsiteController($routeParams,WebsiteService,$location){
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.wid;
        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;

        function init(){
            WebsiteService.findWebsiteById(vm.websiteId)
                .then(function(response){
                    vm.website = response.data;
                });
        }
        init();

        function updateWebsite(website,EditWebsiteForm){
            if(EditWebsiteForm.$valid) {
                WebsiteService.updateWebsite(vm.websiteId, website)
                    .then(
                        function (success) {
                            $location.url("/user/" + vm.userId + "/website");
                        },
                        function (error) {
                            vm.error = "Not able to update the website for the user";
                        });
            }else{
                vm.websiteError = "Please enter a website name!!!"
            }
        }

        function deleteWebsite(){
            WebsiteService.deleteWebsite(vm.websiteId)
                .then(
                    function(success){
                        $location.url("/user/"+vm.userId+"/website");
                    },
                    function(error){
                        vm.error = "Not able to update the website for the user";
                    });
        }
    }
})();
