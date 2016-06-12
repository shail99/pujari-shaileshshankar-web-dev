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
                type: widgetType
            };
            WidgetService.createWidget(vm.pageId,newWidget)
                .then(
                    function(success){
                        var result = success.data;
                        $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/"+result._id);
                    },
                    function(error){
                        vm.error = "Unable to create a new widget";
                    }
                );
        }
    }
    

})();
