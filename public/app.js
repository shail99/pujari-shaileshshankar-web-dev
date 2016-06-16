(function(){
    angular
        .module("HomePage",[])
        .controller("HomePageController",HomePageController);

    function HomePageController($http){
        var vm = this;
        vm.sendMail = sendMail;

        function sendMail(mail){
            var url = "/api/mail";
            $http.post(url,mail)
                .then(function(success){
                    vm.success = "Message sent successfully!!!"
                },function(error){
                    vm.error = "Not able to send the message. Please try again!!!"
                });
        }
    }

})();