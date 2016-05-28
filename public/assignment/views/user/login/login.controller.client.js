/**
 * Created by shaileshpujari on 5/26/16.
 */
(function(){
   angular
       .module("WebAppMaker")
       .controller("LoginController",LoginController);

    function LoginController($location, UserService){
        var vm = this;
        vm.login = function(username,password){

            var user = UserService.findUserByCredentials(username,password);
            if(user){
                $location.url("/user/"+user._id);
            }else{
                vm.error = "Please check username and password"
            }
        }
    }
})();
