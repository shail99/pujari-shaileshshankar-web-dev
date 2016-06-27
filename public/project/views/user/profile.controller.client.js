(function () {
    angular
        .module("EventSmart")
        .controller("ProfileController", ProfileController);

    function ProfileController($rootScope,UserService) {
        var vm = this;
        vm.user = $rootScope.currentUser;
        vm.updateUser = updateUser;
        vm.getProfileImage = getProfileImage;
        
        function init(){
            UserService
                .findUserById(vm.user._id)
                .then(
                    function(response){
                        vm.user = response.data;
                    });
        }

        function getProfileImage(){
            if(vm.user.url){
                return vm.user.url;
            }else{
                return "../../../img/project-images/user.png";
            }
        }

        function updateUser(updatedUser) {
            UserService
                .updateUser(vm.user._id, updatedUser)
                .then(
                    function (response) {
                        vm.success = "Profile updated succesfully";
                    },
                    function (error) {
                        vm.error = "Not able to update the user";
                    }
                );
        }
    }
})();