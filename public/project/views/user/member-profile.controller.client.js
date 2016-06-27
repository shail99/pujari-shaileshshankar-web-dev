(function () {
    angular
        .module("EventSmart")
        .controller("MemberProfileController", MemberProfileController);

    function MemberProfileController(EventService, UserService, $route, $routeParams, $location, $rootScope, MemberProfileService, $anchorScroll) {
        var vm = this;
        vm.eventByCategory = eventByCategory;
        vm.loggedInUser = $rootScope.currentUser;
        vm.getSafeImageUrl = getSafeImageUrl;
        vm.username = $routeParams.username;
        vm.followUser = followUser;
        vm.unFollowUser = unFollowUser;

        init();
        function init() {
            vm.following = [];
            vm.followers = [];
            vm.visitedUserEvents = [];
            vm.userFollowing = false;

            EventService.getCategories()
                .then(
                    function (response) {
                        vm.categories = response.data.categories;
                    },
                    function (error) {
                        vm.categories = [];
                    }
                );

            if (vm.loggedInUser) {
                MemberProfileService
                    .findUserByUsername(vm.loggedInUser.username)
                    .then(
                        function (response) {
                            var user = response.data;
                            if (user) {
                                vm.followedUser = user.followedUser;
                                for (var i in vm.followedUser) {
                                    if (vm.followedUser[i] === vm.username) {
                                        vm.userFollowing = true;
                                    }
                                }

                            }
                        }
                    );
            }

            MemberProfileService
                .findUserByUsername(vm.username)
                .then(
                    function (response) {
                        var user = response.data;
                        if (user) {
                            for (var i in user.followedUser) {
                                UserService
                                    .findUserByUsername(user.followedUser[i])
                                    .then(
                                        function (response) {
                                            vm.following.push(response.data);
                                        }
                                    )
                            }
                        }
                    }
                );

            // Getting followers for a visted profile
            MemberProfileService.findAllUsers()
                .then(
                    function (response) {
                        var userList = response.data;
                        for (var u in userList) {
                            for (var l in userList[u].followedUser) {
                                if (userList[u].followedUser[l] === vm.username) {
                                    UserService
                                        .findUserByUsername(userList[u].username)
                                        .then(
                                            function (response) {
                                                vm.followers.push(response.data);
                                            },
                                            function (error) {
                                                vm.followers = [];
                                            }
                                        )
                                }
                            }
                        }
                    }
                );

            UserService.findUserByUsername(vm.username)
                .then(
                    function (response) {
                        vm.visitedUser = response.data;
                        for (var e in vm.visitedUser.eventsLiked) {
                            EventService.findEventByIdFromDb(vm.visitedUser.eventsLiked[e])
                                .then(
                                    function (response) {
                                        vm.visitedUserEvents.push(response.data);
                                    },
                                    function (error) {
                                        vm.visitedUserEvents = [];
                                    }
                                )
                        }
                    },
                    function (error) {
                        vm.visitedUserError = "Not able to view the user profile!!!"
                    }
                );

        }

        function getSafeImageUrl(logo) {
            if (logo) {
                return logo.url;
            } else {
                return "../../../img/project-images/ear-piece.png";
            }
        }

        function eventByCategory(category) {
            category = category.replace('&', "and");
            $location.url("/event/" + category + "/location/boston")
        }

        function unFollowUser() {
            MemberProfileService
                .findUserByUsername(vm.loggedInUser.username)
                .then(
                    function (response) {
                        var user = response.data;
                        if (user) {
                            for (var i in user.followedUser) {
                                if (user.followedUser[i] === vm.username) {
                                    user.followedUser.splice(i, 1);
                                }
                            }
                            MemberProfileService
                                .updateUser(user._id, user)
                                .then(
                                    function (success) {
                                        init();
                                    },
                                    function (error) {
                                        init();
                                    }
                                );
                        }
                    },
                    function (error) {
                        init();
                    }
                )

        }

        function followUser() {
            var user;
            MemberProfileService
                .findUserByUsername(vm.loggedInUser.username)
                .then(
                    function (response) {
                        user = response.data;
                        if (user) {
                            user.followedUser.push(vm.username);
                            MemberProfileService.updateUser(user._id, user)
                                .then(
                                    function (success) {
                                        init();
                                    },
                                    function (error) {
                                        init();
                                    }
                                );
                        }
                        else {
                            user = {
                                username: vm.loggedInUser.username,
                                followedUser: [vm.username]
                            };

                            MemberProfileService.createUser(user)
                                .then(
                                    function (success) {
                                        init();
                                    },
                                    function (error) {
                                        init();
                                    }
                                );
                        }
                    }
                )
        }
    }
})();