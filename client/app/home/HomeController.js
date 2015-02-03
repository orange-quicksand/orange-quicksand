angular.module('uGame.home', [])


.controller('HomeController', function($scope, $state, $location, Home, User) {

  // Handles initial get request to receive game data using the Home service
  Home.gameData().then(function(data) {
    // Check if data is returned
    if(data){
      // If returned, $scope.data is displayed on page
      $scope.data = data; 
    }else{
      // Else, redirect to log in state
      $location.path('/login');
    }
  });
  
  // goToState (String)
  //-------------------
  // returns: null
  // 
  // WHAT IT DOES
  // 
  // State will change to game corresponding to id from the database
  //
  $scope.goToState = function(id){
    $state.go('game', {id: id});
  };

  // logout ()
  //----------
  // returns: null
  //
  // WHAT IT DOES
  //
  // Ends user session through the User service and redirects to log in state
  //
  $scope.logout = function () {
    User.userLogout(function () {
      $location.path('/login');
    });
  };

});
