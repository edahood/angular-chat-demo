'use strict';

angular.module('chatApp')
.controller('SocketCtrl', function ($log, $scope, chatSocket, messageFormatter, nickName) {
  $scope.nickName = nickName;
  $scope.messageLog = [{ts: new Date(), direction: 'receive', is_bot: true, username: 'chat-bot', body: 'WELCOME!' }];
  $scope.chatMessage = '';
  $scope.sendMessage = function(message) {
    var match = message.match('^\/nick (.*)');

    if (angular.isDefined(match) && angular.isArray(match) && match.length === 2) {
      var oldNick = nickName;
      nickName = match[1];
      
      $scope.messageLog.push({ts: new Date(), is_bot: true, direction: 'receive', username: 'chat-bot', body: 'nickname changed to ' + nickName });
      $scope.nickName = nickName;
      $scope.chatMessage = '';
      $scope.$broadcast('chat message received');
    }
    else {
    $log.debug('sending message', message);
        chatSocket.emit('message', nickName, message);
        $scope.chatMessage = '';
    }
    
  };

  $scope.$on('socket:broadcast', function(event, data) {
    $log.debug('got a message', event.name);
    if (!data.payload) {
      $log.error('invalid message', 'event', event, 'data', JSON.stringify(data));
      return;
    } 
    $scope.$apply(function() {
      $scope.messageLog.push({ts: new Date(), is_bot: data.source === 'chat-bot', direction: data.source == $scope.nickName ? "sent" : "receive", username: data.source, body: data.payload });
      $scope.$broadcast('chat message received');
    });
  });

});
