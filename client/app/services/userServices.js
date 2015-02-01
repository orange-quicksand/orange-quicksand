app.factory('User', function($http, $location) {
  return {

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
        return resp;
      });
    },

    userLogout: function(cb){
      return $http({
        url: '/api/logout',
        method: 'POST',
      }).then(function() {
        cb();
      });
    }

  };
});
