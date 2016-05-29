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
            if(username !== undefined && password1 === password2){
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
