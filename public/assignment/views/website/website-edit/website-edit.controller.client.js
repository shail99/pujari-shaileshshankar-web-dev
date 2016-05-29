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
            vm.website = WebsiteService.findWebsiteById(vm.websiteId);
        }

        init();

        function updateWebsite(website){
            var result = WebsiteService.updateWebsite(vm.websiteId, website);
            if(result){
                $location.url("/user/"+vm.userId+"/website");
            }else{
                vm.error = "Not able to update the website for the user";
            }

        }

        function deleteWebsite(){
            var result = WebsiteService.deleteWebsite(vm.websiteId);
            if(result){
                $location.url("/user/"+vm.userId+"/website");
            }else{
                vm.error = "Not able to delete the website for the user";
            }
        }
    }
})();
