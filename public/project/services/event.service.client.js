(function () {
    angular
        .module("EventSmart")
        .factory("EventService", EventService);

    var token = "2ML7YE6OJPNSP5RANX4H";
    var secret = "SS3WKDVTKQ7XF2YDFQE7ZUBXTZSHIUXFC4YYGWIND4GX4PZDBS";

    function EventService($http) {
        var api = {
            getEvents: getEvents,
            getCategories: getCategories

        };
        return api;

        function getCategories(){
            var urlBase = "https://www.eventbriteapi.com/v3/categories/?token=TOKEN";
            var url = urlBase
                .replace("TOKEN", token);
            return $http.get(url);
        }
        function getEvents(event,location) {
            var urlBase = "https://www.eventbriteapi.com/v3/events/search/?q=SEARCH_TEXT&token=TOKEN";
            var url = urlBase
                .replace("TOKEN", token)
                .replace("SEARCH_TEXT", event);
            return $http.get(url);
        }
    }
})();