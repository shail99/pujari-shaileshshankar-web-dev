/**
 * Created by shaileshpujari on 5/26/16.
 */
(function(){
   angular
       .module("WebAppMaker")
       .controller("LoginController",LoginController);

    function LoginController($location, UserService){
        var vm = this;
        vm.login = function(username,password,LoginForm){
            if(LoginForm.$valid){
                UserService
                    .login(username,password)
                    .then(
                        function (response){
                            var user = response.data;
                            if(user){
                                $location.url("/user/");
                            }
                        },
                        function(error){
                            vm.error = "User not found";
                    });
            }else{
                vm.error = "There are errors in the form!!!";
            }
        }
    }
})();
