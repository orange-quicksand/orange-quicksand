app.factory('Game', function($http, $location) {
  return {

    // get (string)
    //-------------
    // returns: object, boolean;
    //
    // WHAT IT DOES
    //
    // Receives id of game and sends it through a GET request to the
    // server. It either receives the game in a object which it then returns
    // or an error object that it then throws.
    //
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

    // save (object)
    //-------------
    // returns: object, boolean;
    //
    // WHAT IT DOES
    //
    // Receives the game information in an object which it
    // sends to the server through a POST request. It either receives
    // a response that it then returns or an error in which it sends a
    // false boolean.
    //
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

    // load (string)
    //-------------
    // returns: object, boolean;
    //
    // WHAT IT DOES
    //
    // Receives id of the game and sends it through a GET request to the
    // server. It either receives the saved game information in a object
    // which it then returns or an error object that it then throws.
    //
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
