(function () {
    angular
        .module("EventSmart")
        .controller("EventDetailController", EventDetailController);

    function EventDetailController(EventService, $routeParams, $sce, $location, $rootScope, $route, CommentService, UserService) {
        var vm = this;
        vm.eventId = $routeParams.eventId;
        vm.user = $rootScope.currentUser;
        vm.getSafeHtml = getSafeHtml;
        vm.eventByCategory = eventByCategory;
        vm.createComment = createComment;
        vm.removeComment = removeComment;
        vm.saveEvent = saveEvent;
        vm.unLikeEvent = unLikeEvent;
        vm.visitProfile = visitProfile;

        function init() {
            vm.comments=[];
            if(vm.user)
                isEventSavedbyUser();

            EventService.getCategories()
                .then(
                    function (response) {
                        vm.categories = response.data.categories;
                    },
                    function (error) {
                        vm.categories = [];
                    }
                );
            EventService.getEventbyId(vm.eventId)
                .then(
                    function (response) {
                        vm.event = response.data;
                    },
                    function (error) {
                        vm.eventError = "Unable to find the event. Try again later!!!"
                    }
                );
            CommentService.findCommentByEventId(vm.eventId)
                .then(
                    function (response) {
                        vm.comments = response.data;
                        for (var i in vm.comments) {
                            vm.comments[i].dateCreated = new Date(vm.comments[i].dateCreated).toString();
                        }
                    }
                );

            if (!vm.user) {
                $('#commentButton').prop('disabled', true);
            }
            else {
                $('#commentButton').prop('disabled', false);
            }
        }

        init();

        function visitProfile(username) {
            if (vm.user && vm.user.username === username) {
                $location.url("/user/profile");
            } else {
                $location.url("/user/project/profile/" + username);
            }

        }

        function isEventSavedbyUser() {

            EventService.findEventByEventIdFromDb(vm.eventId)
                .then(
                    function (response) {
                        var event = response.data;
                        if (event) {
                            UserService.findUserById(vm.user._id)
                                .then(
                                    function (response) {
                                        var user = response.data;
                                        for (var i in user.eventsLiked) {
                                            if (event._id === user.eventsLiked[i]) {
                                                vm.savedEvent = true;
                                                return;
                                            }
                                        }
                                        vm.savedEvent = false;
                                    }
                                )

                        } else {
                            vm.savedEvent = false;
                        }
                    }
                );
        }

        function removeComment(commentId) {
            CommentService.removeComment(commentId)
                .then(
                    function (success) {
                       init();
                    },
                    function (error) {
                        init();
                    }
                )
        }

        function getSafeHtml(text) {
            return $sce.trustAsHtml(text);
        }

        function eventByCategory(category) {
            category = category.replace('&', "and");
            $location.url("/event/" + category + "/location/boston")
        }

        function createComment(commentText,commentForm) {
            $("#commentText").val('');
            if (commentForm.$valid) {
                var comment = {
                    username: vm.user.username,
                    commentText: commentText,
                    url: vm.user.url,
                    eventId: vm.eventId,
                    eventRating: vm.rating
                };

                CommentService
                    .createComment(comment)
                    .then(
                        function (comment) {
                            init();
                        },
                        function (error) {
                            vm.commentError = "Not able to post the comment!!! Try again later"
                        }
                    )
            }
        }

        function unLikeEvent() {
            EventService.findEventByEventIdFromDb(vm.eventId)
                .then(
                    function (response) {
                        var event = response.data;
                        if (event) {
                            UserService.findUserById(vm.user._id)
                                .then(
                                    function (response) {
                                        var user = response.data;
                                        for (var i in user.eventsLiked) {
                                            if (event._id === user.eventsLiked[i]) {
                                                user.eventsLiked.splice(i, 1);
                                                break;
                                            }
                                        }
                                        return UserService.updateUser(vm.user._id, user)
                                    }
                                )

                        } else {
                            vm.savedEvent = false;
                        }
                    }
                )
                .then(
                    function (success) {
                        init();
                    },
                    function (error) {
                        init();
                    }
                );
        }

        function saveEvent() {
            var event = {
                eventId: vm.eventId,
                eventName: vm.event.name.text,
                eventImage: vm.event.logo.url,
                eventUrl: vm.event.url,
                eventStart: new Date(vm.event.start.local).toString()
            };

            EventService
                .createEvent(event)
                .then(
                    function (response) {
                        var event = response.data;
                        UserService
                            .findUserById(vm.user._id)
                            .then(
                                function (response) {
                                    var user = response.data;
                                    user.eventsLiked.push(event);
                                    return UserService.updateUser(vm.user._id, user);
                                }
                            )
                    },
                    function (error) {
                        vm.eventError = "Unable to create an event";
                    }
                )
                .then(
                    function (success) {
                        init();
                    },
                    function (error) {
                        vm.error = "Unable to save the event!!"
                    }
                )
        }
    }
})();