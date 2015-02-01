app.factory('Game', function($http, $location) {
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

    save: function(data) {
      return $http({
        url: '/api/save',
        method: 'POST',
        data: data
      }).then(
        function(resp) {
          return resp;
        },
        function(error) {
          return false;
        }
      );
    },

    load: function(game_id) {
      return $http({
        method: 'GET',
        url: '/api/save/' + game_id
      })
      .then(
        function(resp) {
          if (resp.data[0]) {            
            return resp.data[0];
          } else {
            return false;
          }
        },
        function(error) {
          throw error.status + ' : ' + error.data;
        }
      );
    }

  };
});
