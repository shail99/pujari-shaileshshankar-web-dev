/**
 * Created by shaileshpujari on 5/28/16. for the Event Smart Project
 */
(function(){
    angular
        .module("EventSmart")
        .factory("MemberProfileService", MemberProfileService);

    function MemberProfileService($http){
        var api={
            createUser : createUser,
            findUserByUsername : findUserByUsername,
            updateUser : updateUser,
            findAllUsers: findAllUsers,
            deleteUser : deleteUser
        };

        return api;

        function createUser(user){
            var url = "/project/follow/user";
            return $http.post(url,user);

        }
        function findUserById(userId){
            var url = "/project/user/" + userId;
            return $http.get(url);
        }

        function findUserByUsername(username){
            var url = "/project/follow/user/"+username;
            return $http.get(url);
        }

        function updateUser(userId, newUser){
            var url = "/project/follow/user/" + userId;
            return $http.put(url, newUser);
        }

        function deleteUser(userId){
            var url = "/api/user/" + userId;
            return $http.delete(url);
        }

        function findAllUsers(){
            var url = "/project/follow/users";
            return $http.get(url);
        }

    }

})();
