angular.module('uGame.home', [])

.controller('HomeController', function ($scope, $http, $interval, $state, Game) {
  $scope.goToState = function(id){
   $state.go('game', {id: id})
  };

  Game.gameData().then(function(data) {
    $scope.data = data; 
  })
});
