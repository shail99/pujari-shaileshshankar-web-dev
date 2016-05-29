/**
 * Created by shaileshpujari on 5/26/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams,UserService,$location) {
        var vm = this;
        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;

        vm.id = $routeParams.userId;

        function init(){
            vm.user = UserService.findUserById(vm.id);
        }

        init();

        function updateUser(newUser){
            UserService.updateUser(vm.id,newUser);
        }

        function deleteUser(){
            var result = UserService.deleteUser(vm.id);
            if(result){
                $location.url("/login");
            }else{
                vm.error = "User cannot be deleted";
            }
        }

    }
})();
