angular.module('uGame.register', [])

.controller('RegisterController', function($scope, $location, Game){
  $scope.user = {};

  //click listener for sending post request to server
  $scope.register = function(){
    //will only post if username and password is present
    if($scope.user.username && $scope.user.password){
      Game.userRegister($scope.user);
    }else {
      return false;
    }
  };
});
