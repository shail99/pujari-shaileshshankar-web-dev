(function(){
    angular
        .module("EventSmart")
        .controller("EventDetailController",EventDetailController);

    function EventDetailController(EventService,$routeParams,$sce,$location,$rootScope){
        var vm = this;
        vm.eventId = $routeParams.eventId;
        vm.user = $rootScope.currentUser;
        vm.getSafeHtml = getSafeHtml;
        vm.eventByCategory = eventByCategory;

        function init(){
            EventService.getCategories()
                .then(
                    function(response){
                        vm.categories = response.data.categories;
                        console.log(vm.categories);
                    },
                    function(error){
                        vm.categories=[];
                    }
                );
            EventService.getEventbyId(vm.eventId)
                .then(
                    function (response) {
                        vm.event = response.data;
                        console.log(vm.event);
                    },
                    function(error){
                        vm.eventError = "Unable to find the event. Try again later!!!"
                    }
                );
            if(!vm.user) {
                $('#commentButton').prop('disabled', true);
            }
            else{
                $('#commentButton').prop('disabled', false);
            }
        }
        init();

        function getSafeHtml(text) {
            return $sce.trustAsHtml(text);
        }

        function eventByCategory(category) {
            category = category.replace('&',"and");
            $location.url("/event/"+category+"/location/boston")
        }
    }
})();
