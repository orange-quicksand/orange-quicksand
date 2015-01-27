angular.module('uGame.login', [])

.controller('LoginController', function($scope, $interval, $http, Game){
  $scope.user = {};

  var array = ['i', 'we', 'they', 'u'];
  var i = -1;
  //creates the banner for the login page. Change if wanted
  $interval(function(){
    if(i >= array.length){
      i = -1
    }
    i++
    $scope.changedWords = array[i]
  }, 500, 4);

  //sends login information to server
  $scope.login = function(){
    //only makes post request to log in if user placed a valid
    //username and password
    if($scope.user.username && $scope.user.password){
      Game.gameLogin($scope.user).then(function(data){
        console.log(data);
      })
    }
  }

});