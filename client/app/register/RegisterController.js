angular.module('uGame.register', [])

.controller('RegisterController', function($scope, $location, Game, LxNotificationService){
  $scope.user = {};

  // Sends username and password through a POST request to server to register user
  $scope.register = function(){
    // Sends POST request only if username and password is present
    if($scope.user.username && $scope.user.password){
      Game.userRegister($scope.user).then(function(resp){
        if (resp.data) {
          // If valid entry, redirect to login page
          $location.path('/login');
        }else{
          // If invalid entry, notify user
          LxNotificationService.error('User already exists');
        }
      });
    }else{
      return false;
    }
  };

});
