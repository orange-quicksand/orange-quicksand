angular.module('uGame.home', [])


.controller('HomeController', function($scope, $http, $interval, $state, Game, $location) {

  //depending on game, your url will match its id from the database
  $scope.goToState = function(id){
   $state.go('game', {id: id});
  };
});
