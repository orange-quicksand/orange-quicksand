angular.module('uGame.register', [])

.controller('RegisterController', function($scope, $location, User, LxNotificationService){
  $scope.user = {};

  // register ()
  //------------
  // returns: null;
  //
  // WHAT IT DOES
  //
  // Checks if text boxes contain strings and then sends username and
  // password to the server through the User service to register the user. 
  //
  $scope.register = function(){
    // Sends POST request only if username and password is present
    if($scope.user.username && $scope.user.password){
      User.userRegister($scope.user).then(function(resp){
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
