/**
 * Created by shaileshpujari on 5/28/16.
 */
(function(){
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    function UserService($http){
        var api={
            createUser : createUser,
            login : login,
            findUserById : findUserById,
            findUserByUsername : findUserByUsername,
            findUserByCredentials : findUserByCredentials,
            updateUser : updateUser,
            deleteUser : deleteUser
        }

        return api;

        function login(username,password){
            var user = {
                username: username,
                password: password
            };
            var url = "/api/login";
            return $http.post(url,user);
        }

        function createUser(user){
            var url = "/api/user";
            return $http.post(url,user);

        }
        function findUserById(userId){
            var url = "/api/user/" + userId;
            return $http.get(url);
        }

        function findUserByUsername(username){
            var url = "/api/user?username="+username;
            return $http.get(url);
        }

        function findUserByCredentials(username,password){
            var url = "/api/user?username="+username+"&password="+password;
            return $http.get(url);
        }

        function updateUser(userId, newUser){
            var url = "/api/user/" + userId;
            return $http.put(url, newUser);
        }

        function deleteUser(userId){
            var url = "/api/user/" + userId;
            return $http.delete(url);
        }

    }
    
})();
