angular.module('uGame.login', [])

.controller('LoginController', function($scope, $interval, $location, User, LxNotificationService){
  $scope.user = {};

  var array = ['i', 'we', 'they', 'u'];
  var i = -1;
  // Creates banner animation
  $interval(function(){
    if(i >= array.length){
      i = -1;
    }
    i++;
    $scope.changedWords = array[i];
  }, 500, 4);

  // Sends login information through a POST request to server for access to api
  $scope.login = function(){
    // Sends POST request only if username and password is present
    if($scope.user.username && $scope.user.password){
      User.userLogin($scope.user).then(function(resp){
        if (resp.data) {
          // If valid entry, redirect to home page
          $location.path('/home');
        }else{
          // If invalid entry, notify user
          LxNotificationService.error('Invalid username and password');
        }
      });
    }else{
      return false;
    }
  };

});
