(function() {
    'use strict';

    angular.module('chatApp')
    .directive('chatBox', function($timeout) {
        return {
            restrict: 'E',
            templateUrl: '/views/chatbox.html',
            controller: function($scope, $element) {
                $scope.$on('chat message received', function() {
                  $timeout(function(){
                    var chatArea = $element.find("#chatBody");
                    chatArea.scrollTop(900);
                  }, 0);

                  
                });
            }
        };
    });

}());
