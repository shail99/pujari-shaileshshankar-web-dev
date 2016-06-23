(function () {
    angular
        .module("HomePage", [])
        .controller("LandingPageController", LandingPageController);

    function LandingPageController($http, $location) {
        var vm = this;
        vm.sendMail = sendMail;
        vm.scrollTo = scrollTo;

        function sendMail(mail) {
            var url = "/api/mail";
            $http.post(url, mail)
                .then(function (success) {
                    vm.success = "Message sent successfully!!!"
                }, function (error) {
                    vm.error = "Not able to send the message. Please try again!!!"
                });
        }

        function scrollTo(id) {
            var old = $location.hash();
            console.log(old);
            $location.hash(id);
            $anchorScroll();
            //reset to old to keep any additional routing logic from kicking in
            $location.hash(old);
        }


    }

})();