app.factory('Home', function($http, $location) {
  return {

    // gameData ()
    //------------
    // returns: object, boolean
    //
    // WHAT IT DOES
    //
    // Sends GET request to server for list of games.
    // If user session is valid, gameData will receive
    // an object containing the array of games.
    // If the session is invalid, gameData will receive
    // the boolean false.
    // Game data then returns this result. 
    gameData: function() {
      return $http({
        method: 'GET',
        url: '/api/games'
      })
      .then(function(resp){
        return resp.data;
      });
    }

  };
});
