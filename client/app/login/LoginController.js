angular.module('uGame.login', [])

.controller('LoginController', function($scope, $interval, $location, User, LxNotificationService){
  $scope.user = {};

  // Creates banner animation
  var array = ['i', 'we', 'they', 'u'];
  var i = -1;
  $interval(function(){
    if(i >= array.length){
      i = -1;
    }
    i++;
    $scope.changedWords = array[i];
  }, 500, 4);

  // login ()
  //---------
  // returns: null;
  //
  // WHAT IT DOES
  //
  // Sends login information through a POST request to server for access to api through the User service
  //
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
