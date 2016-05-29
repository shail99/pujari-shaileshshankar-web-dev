/**
 * Created by shaileshpujari on 5/26/16.
 */
(function(){
   angular
       .module("WebAppMaker")
       .controller("NewWidgetController",NewWidgetController);

    function NewWidgetController($routeParams, WidgetService, $location){
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.createWidget = createWidget;

        function createWidget(widgetType){
            var newWidget = {
                _id: new Date().getTime()+"",
                widgetType: widgetType
            };
            var result = WidgetService.createWidget(vm.pageId,newWidget);
            if(result){
                $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/"+result._id);
            }else{
                vm.error = "Unable to create a new widget";
            }
        }
    }
    

})();
