app.factory('Game', function ($http) {
  return {
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
      })  
    }
  };
});
