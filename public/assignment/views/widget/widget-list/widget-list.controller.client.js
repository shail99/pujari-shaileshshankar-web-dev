/**
 * Created by shaileshpujari on 5/26/16.
 */
(function(){
   angular
       .module("WebAppMaker")
       .controller("WidgetListController",WidgetListController);

    function WidgetListController($routeParams, WidgetService, $sce){
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        
        vm.getSafeHtml = getSafeHtml;
        vm.getSafeUrl = getSafeUrl;

        function init(){
            WidgetService.findWidgetsByPageId(vm.pageId)
                .then(function(response){
                    vm.widgets = response.data;
                });
        }
        init();

        function getSafeHtml(widget) {
            return $sce.trustAsHtml(widget.text);
        }

        function getSafeUrl(widget) {
            var urlParts = widget.url.split("/");
            var id = urlParts[urlParts.length - 1];
            var url = "https://www.youtube.com/embed/" + id;
            return $sce.trustAsResourceUrl(url);

        }
    }
})();
