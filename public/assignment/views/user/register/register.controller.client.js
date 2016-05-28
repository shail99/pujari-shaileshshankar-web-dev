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

        function createUser(username,password1,password2) {
            if(password1 === password2){
                var newUser = {
                    _id: new Date().getTime() + "",
                    username: username,
                    password: password1,
                    firstName: "",
                    lastName: ""
                }
                var result = UserService.createUser(newUser);
                if(result){
                    $location.url("/user/"+newUser._id);
                }else{
                    vm.error = "User not created";
                }

            }else{
                vm.error = "Passwords do not match!!! Please enter again";
            }
        }
    }
})();
