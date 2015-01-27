angular.module('uGame.services', [])
.factory('Game', ['$http', function($http) {
  return {
    get: function(id) {
      return $http.get('/api/game/' + id);
    }
  };
}]);
