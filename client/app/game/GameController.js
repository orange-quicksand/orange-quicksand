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

  $scope.getGameBoyAPI = function() {
    $scope.API = window.frames.GBC.gameBoyAPI;
    console.dir($scope.API);
  };


}])

.factory('Game', ['$http', function($http) {
  return {
    get: function(id) {
      return $http.get('/game/' + id);
    }
  };
}])

.directive('iframeOnload', [function(){
  return {

    scope: {
      callBack: '&iframeOnload'
    },

    link: function(scope, element, attrs){
      element.on('load', function(){
        return scope.callBack();
      })
    }

  }
}])