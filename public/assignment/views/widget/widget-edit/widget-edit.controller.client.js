/**
 * Created by shaileshpujari on 5/26/16.
 */
(function(){
   angular
       .module("WebAppMaker")
       .controller("EditWidgetController",EditWidgetController);

    function EditWidgetController($routeParams, WidgetService,$location){
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.widgetId = $routeParams.wgid;
        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;

        function init(){
            vm.widget = WidgetService.findWidgetById(vm.widgetId);
        }
        init();

        function updateWidget(widget){
            var result = WidgetService.updateWidget(vm.widgetId,widget);
            if(result){
                $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget")
            }else{
                vm.error = "Not able to update the widget"
            }
        }

        function deleteWidget(){
            var result = WidgetService.deleteWidget(vm.widgetId);
            if(result){
                $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget")
            }else{
                vm.error = "Not able to delete the widget"
            }

        }
    }
})();
