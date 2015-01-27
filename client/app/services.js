app.factory('Game', function($http) {
  return {
    get: function(id) {
      return $http.get('/api/game/' + id);
    },
    gameData: function() {
      return $http({
        method: 'GET',
        url: '/api/games'
      })
      .then(function(resp){
        return resp.data;
      });
    },
    gameLogin: function(userObj){
      return $http({
        url: '/user/login',
        method: 'POST',
        data: userObj
      }).then(function(resp){
        return resp;
      });  
    }
  };
});
