/**
 * Created by shaileshpujari on 5/26/16.
 */
(function(){
   angular
       .module("WebAppMaker")
           .controller("NewPageController",NewPageController);

    function NewPageController($routeParams, PageService,$location){
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.wid;
        vm.createPage = createPage;

        function createPage(pageName,NewPageForm){
            var newPage = {
              name: pageName
            };
            if(NewPageForm.$valid) {
                PageService.createPage(vm.websiteId, newPage)
                    .then(
                        function (response) {
                            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                        },
                        function (error) {
                            vm.error = "Not able to create a page for the user";
                        }
                    );
            }else{
                vm.pageError="Please enter a page name!!!"
                vm.error = "There are errors in the form!!!";
            }
        }
    }
})();
