angular.module('uGame.register', [])

.controller('RegisterController', function($scope, $http, $location){
  $scope.user = {};

  //click listener for sending post request to server
  $scope.register = function(){
    //will only post if username and password is present
    if($scope.user.username && $scope.user.password){
      $http({
        url: '/api/register',
        method: 'POST',
        data: $scope.user
      }).then(function(resp) {
        if (resp.data) {
          //if true, will redirect to login for user to login
          $location.path('/login');
        } else {
          //if false, will let user know username is already in use
          console.log('Already exists');
        }
      });
    } else {
      return false;
    }
  };
});
