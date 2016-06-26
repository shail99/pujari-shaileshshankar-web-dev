(function () {
    angular
        .module("EventSmart")
        .controller("HomePageController", HomePageController);

    function HomePageController($location, $anchorScroll, UserService, $rootScope, $route) {
        var vm = this;
        vm.searchEvent = searchEvent;
        vm.login = login;
        vm.register = register;

        function searchEvent(event, location, SearchEventForm) {
            if (SearchEventForm.$valid) {
                $location.url("/event/" + event + "/location/" + location);
            }
        }

        /*
         Handles the login in the controller
         */
        function login(username, password, LoginForm) {
            vm.LoginSuccess = null;
            vm.LoginError = null;
            if (LoginForm.$valid) {
                UserService
                    .login(username, password)
                    .then(
                        function (response) {
                            var user = response.data;
                            if (user) {
                                $route.reload();
                                vm.LoginSuccess = "Login successfull"
                            }
                        },
                        function (error) {
                            vm.LoginError = "User not found";
                        });
            } else {
                vm.LoginError = "There are errors in the form!!!";
            }
        }

        /*
         Handles the registration of a particular user in the controller
         */
        function register(username,password,email,RegisterForm) {
            vm.RegisterSuccess = null;
            vm.RegisterError = null;
            if(RegisterForm.$valid && RegisterForm.registerpassword.$modelValue === RegisterForm.verifypassword.$modelValue){
                var newUser = {
                    username: username,
                    password: password,
                    email: email,
                    firstName: "",
                    lastName: "",
                    type: "member"
                };

                UserService
                    .register(newUser)
                    .then(
                        function(response){
                            var user = response.data;
                            vm.RegisterSuccess = "Registration successfull";
                            $route.reload();
                        },
                        function(error){
                            vm.RegisterError = error.data;
                        }
                    );
            }else{
                vm.error = "There are errors in the form";
                if(RegisterForm.registerpassword.$modelValue !== RegisterForm.verifypassword.$modelValue)
                {
                    vm.passwordError = "Passwords do not match!!!";
                }
            }
        }
    }
})();