angular.module('uGame.game', [])

.controller('GameController', ['$scope', '$stateParams', 'Game' ,function($scope, $stateParams, Game){
   
 $scope.loadGame = function() {
 	Game.get($stateParams.id)
 	  .success(function(resp) {
        console.log(resp);
 	  })
 	  .error(function(resp) {
        console.log(resp);
 	  });
 };
}])

.factory('Game', ['$http', function($http) {
  return {
  	get: function(id) {
  	  return $http.get('/game/' + id);
  	}
  };
}]);