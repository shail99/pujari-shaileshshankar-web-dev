/**
 * Created by shaileshpujari on 5/26/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController($routeParams,UserService,$location) {
        var vm = this;
        vm.createUser = createUser;
        vm.register = register;

        function register(username,password1,password2,RegisterForm){
            if(RegisterForm.$valid && RegisterForm.password.$modelValue === RegisterForm.password1.$modelValue){
                var newUser = {
                    username: username,
                    password: password1,
                    firstName: "",
                    lastName: ""
                };

                UserService
                    .register(newUser)
                    .then(
                        function(response){
                            var user = response.data;
                            $location.url("/user/");
                        },
                        function(error){
                            vm.error = error.data;
                        }
                    );
            }else{
                vm.error = "Please rectify the errors in the form";
                if(RegisterForm.password.$modelValue !== RegisterForm.password1.$modelValue)
                {
                   vm.passwordError = "Passwords do not match!!!";
                }
            }

        }

        function createUser(username,password1,password2) {
            if(username && password1 === password2){
                var newUser = {
                    username: username,
                    password: password1,
                    firstName: "",
                    lastName: ""
                };

                UserService
                    .createUser(newUser)
                    .then(
                        function(response){
                            var user = response.data;
                            $location.url("/user/"+user._id);
                        },
                        function(error){
                            vm.error = "User not created";
                        }
                    );
            }else{
                if(username === undefined ) {
                    vm.error = "Please enter a username";
                }else if(password1 === undefined || password2 === undefined){
                    vm.error = "Please enter password";
                }else{
                    vm.error = "Passwords do not match. Please check!!";
                }

            }
        }
    }
})();
