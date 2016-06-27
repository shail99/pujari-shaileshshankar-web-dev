(function () {
    angular
        .module("EventSmart")
        .factory("EventService", EventService);

    var token = "2ML7YE6OJPNSP5RANX4H";
    var secret = "SS3WKDVTKQ7XF2YDFQE7ZUBXTZSHIUXFC4YYGWIND4GX4PZDBS";

    function EventService($http) {
        var api = {
            getEvents: getEvents,
            getCategories: getCategories,
            getEventbyId: getEventbyId,
            findEventByEventIdFromDb: findEventByEventIdFromDb,
            findEventByIdFromDb: findEventByIdFromDb,
            createEvent: createEvent

        };
        return api;

        function createEvent(event){
            var url = "/project/event";
            return $http.post(url,event);
        }

        function getCategories(){
            var urlBase = "https://www.eventbriteapi.com/v3/categories/?token=TOKEN";
            var url = urlBase
                .replace("TOKEN", token);
            return $http.get(url);
        }
        function getEvents(event,location) {
            var urlBase = "https://www.eventbriteapi.com/v3/events/search/?q=SEARCH_TEXT&location.address=MY_LOCATION&token=TOKEN";
            var url = urlBase
                .replace("TOKEN", token)
                .replace("SEARCH_TEXT", event)
                .replace("MY_LOCATION", location);
            return $http.get(url);
        }
        function getEventbyId(eventId) {
            var urlBase = "https://www.eventbriteapi.com/v3/events/"+eventId+"/?token=TOKEN";
            var url = urlBase
                .replace("TOKEN", token)
            return $http.get(url);
        }
        function findEventByEventIdFromDb(eventId){
            var url = "/project/event/" + eventId;
            return $http.get(url);
        }
        function findEventByIdFromDb(id){
            var url = "/project/profile/event/" + id;
            return $http.get(url);
        }
    }
})();