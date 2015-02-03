app.factory('User', function($http, $location) {
  return {

    // userLogin (Object)
    //-------------------
    // returns: boolean;
    //
    // WHAT IT DOES
    //
    // Receives user object with username and password and sends it 
    // through a POST request to the server. Sever sends a response in 
    // the form of a boolean which userLogin returns.
    //
    userLogin: function(userObj){
      return $http({
        url: '/api/login',
        method: 'POST',
        data: userObj
      }).then(function(resp){
        return resp;
      });
    },

    // userRegister (Object)
    //----------------------
    // returns: boolean;
    //
    // WHAT IT DOES
    //
    // Receives user object with username and password and sends it 
    // through a POST request to the server. Sever sends a response in 
    // the form of a boolean which userRegister returns.
    //
    userRegister: function(userObj){
      return $http({
        url: '/api/register',
        method: 'POST',
        data: userObj
      }).then(function(resp) {
        return resp;
      });
    },

    // userLogout (Object)
    //--------------------
    // returns: null;
    //
    // WHAT IT DOES
    //
    // Receives a callback and sends a POST request to the
    // server. Once the server sends back a response, the
    // callback function is called.
    //
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
