angular.module('uGame.game', [])

// GameController (controller)
//===============================
//
// WHAT IT DOES
//
// Controller for the Gameboy Color emulator.
// 

.controller('GameController', function($scope, $timeout, $stateParams, $location, Game) {

  
  var gameIsLoaded = false;
  var gameIsPaused = false;
  var menuTimer = null;
  var menuHasJustBeenShow = false;
  var menuIsPinned = false;

  $scope.menuIsShown = false;
  $scope.gameInfo = {
    title: 'Loading Game...'
  };

  $scope.loadGame = function() {
    Game.get($stateParams.id)
      .success(function(game) {        
        $scope.API.init(game[0].rom);
        $scope.gameInfo = {
          title: game[0].title
        };
        gameIsLoaded = true;
      })
      .error(function(error) {
        console.error(error);
        $location.path('/login');
      });
  };

  $scope.togglePinMenu = function() {    
    menuIsPinned = !menuIsPinned;
  };

  $scope.showMenuWhileMoving = function(event) {    
    if (gameIsLoaded && !menuHasJustBeenShow && !menuIsPinned) {
      
      $scope.menuIsShown = true;

      if (menuTimer) { 
        $timeout.cancel(menuTimer); 
      }
      
      menuTimer = $timeout(function() { 
        if (!menuIsPinned) {
          $scope.hideMenu();         
        }
      }, 2000);      
    }
  };
  
  $scope.hideMenu = function() {
    $scope.menuIsShown = false;
    menuIsPinned = false;

    // HACK - Omar
    // If we don't do this, the Menu will flash again.
    // There's something weird happening with the angular
    // digest loop that I'm unable to debug.
    // Try removing this and see for yourself.
    menuHasJustBeenShow = true;
    $timeout(function() { menuHasJustBeenShow = false; }, 500);
  };

  $scope.getGameBoyAPI = function() {
    $scope.API = window.frames.GBC.gameBoyAPI;
    $scope.loadGame();
  };

})

// uGameIframeOnload (directive)
//===============================
//
// WHAT IT DOES
//
// It takes a callback provided in the directive attibute
// and calls it as a $scope function when the element
// has loaded.
//
.directive('uGameIframeOnload', function($window){
  var w = angular.element($window);

  return {

    scope: {
      callBack: '&uGameIframeOnload'
    },

    link: function(scope, element, attrs){
      element.on('load', function() {
        return scope.callBack();
      });
    }
  };
});
