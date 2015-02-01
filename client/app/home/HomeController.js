angular.module('uGame.home', [])


.controller('HomeController', function($scope, $state, $location, Home, User) {

  //depending on game, your url will match its id from the database
  $scope.goToState = function(id){
   $state.go('game', {id: id});
  };

  //initial get request to receive game data
  Home.gameData().then(function(data) {
    if(data){
      //$scope.data is displayed on page
      $scope.data = data; 
    }else{
      $location.path('/login');
    }
  });

  // Log out
  $scope.logout = function () {
    User.userLogout(function () {
      $location.path('/login');
    });
  };

});
