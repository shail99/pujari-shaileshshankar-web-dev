/**
 * Created by shaileshpujari on 5/26/16.
 */
(function(){
   angular
       .module("WebAppMaker")
       .controller("PageListController",PageListController);

    function PageListController($routeParams, PageService){
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.wid;

        function init(){
            PageService.findPageByWebsiteId(vm.websiteId)
                .then(function(response){
                    vm.pages = response.data;
                });
        }
        init();
    }
})();
