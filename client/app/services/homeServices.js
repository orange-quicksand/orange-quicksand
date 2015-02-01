app.factory('Home', function($http, $location) {
  return {

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
