/**
 * Created by shaileshpujari on 5/26/16.
 */
(function(){
   angular
       .module("WebAppMaker")
       .controller("EditPageController",EditPageController);

    function EditPageController($routeParams, PageService,$location){
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;

        vm.updatePage = updatePage;
        vm.deletePage = deletePage;

        function init(){
            vm.page = PageService.findPageById(vm.pageId);
        }
        init();

        function updatePage(page){
            var result = PageService.updatePage(vm.pageId, page);
            if(result){
                $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
            }else{
                vm.error = "Not able to update the page for website";
            }

        }

        function deletePage(){
            var result = PageService.deletePage(vm.pageId);
            if(result){
                $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
            }else{
                vm.error = "Not able to delete the page for website";
            }
        }
    }
})();
