angular.module('uGame.register', [])

.controller('RegisterController', function($scope, $http){
  $scope.user = {};

  //click listener for sending post request to server
  $scope.register = function(){
    //will only post if username and password is present
    if($scope.user.username && $scope.user.password){
      $http({
        url: '/user/register',
        method: 'POST',
        data: $scope.user
      }).then(function(resp){
        //resp === ture || false depending on if username is already taken
        //if true, will redirect to login for user to login
        //if false, will let user know username is already in use
        console.log(resp);
      })
    }
  };
});