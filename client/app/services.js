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

    gameData: function() {
      return $http({
        method: 'GET',
        url: '/api/games'
      })
      .then(function(resp){
        return resp.data;
      });
    },

    userLogin: function(userObj){
      return $http({
        url: '/api/login',
        method: 'POST',
        data: userObj
      }).then(function(resp){
        return resp;
      });
    },

    userRegister: function(userObj){
      return $http({
        url: '/api/register',
        method: 'POST',
        data: userObj
      }).then(function(resp) {
        if (resp.data) {
          //if true, will redirect to login for user to login
          $location.path('/login');
        } else {
          //if false, will let user know username is already in use
          console.log('Already exists');
        }
      });
    }

  };
});
