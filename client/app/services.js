app.factory('Game', function($http) {
  return {

    get: function(id) {
      return $http({
        method: 'GET',
        url: '/api/game/' + id
      })
      .then(
        function(resp) {
          if (resp.data) {
            return resp.data[0];
          } else {
            return false;
          }
        },
        function(error){
          throw error.status + ' : ' + error.data;
        }
      );
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
        url: '/api/login',
        method: 'POST',
        data: userObj
      }).then(function(resp){
        return resp;
      });
    }

  };
});
