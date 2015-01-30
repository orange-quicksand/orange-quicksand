angular.module('uGame.game', ['ngFx'])

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
  var menuIsPinned = false;

  // This var is used for a Hack in $scope.hideMenu()
  var menuHasJustBeenShow = false;

  $scope.menuIsShown = false;

  $scope.gameInfo = {
    title: 'Loading Game...'
  };

  // loadGame ()
  //----------------
  //
  // WHAT IT DOES
  //
  // GETs the game from server and loads it into the emulator;
  //
  $scope.loadGame = function() {
    Game.get($stateParams.id)
      .then(function(game){
        if (game) {

          $scope.API.init(game.rom);
          $scope.gameInfo = {
            title: game.title
          };
          gameIsLoaded = true;

        } else {
          $location.path('/login');
        }
      });
  };

  // getGameBoyApi ()
  //-----------------
  //
  // NOTE: This is called when the 'u-game-i-frame-on-load' directive
  // determines that the Emulator has finished loading.
  //
  // WHAT IT DOES
  //
  // Fetches the gameBoyAPI object from the emulator's iframe.
  //
  $scope.getGameBoyAPI = function() {
    $scope.API = window.frames.GBC.gameBoyAPI;
    $scope.loadGame();
  };



  // MENU HELPER FUNCTIONS RUNDOWN
  //-------------------------------
  //
  // togglePinMenu ()
  //------------------
  //
  // WHAT IT DOES
  //
  // It allows the menu to stay visible when the mouse
  // is over (ng-mouseover) a menu item.
  //
  $scope.togglePinMenu = function() {    
    menuIsPinned = !menuIsPinned;
  };

  // showMenuWhileMoving ()
  //-----------------------
  //
  // WHAT IT DOES
  //
  // It shows the menu when the mouse moves.
  // It hides the menu if the mouse has not moved for X ms.
  // Destroys previous hideMenu timeouts on posterior mouse move events.
  //
  $scope.showMenuWhileMoving = function() {    
    if (gameIsLoaded && !menuHasJustBeenShow && !menuIsPinned) {
      $scope.menuIsShown = true;

      if (menuTimer) { 
        $timeout.cancel(menuTimer); 
      }
      
      menuTimer = $timeout(function() { 
        if (!menuIsPinned) {
          $scope.hideMenu();         
        }
      }, 3500);      
    }
  };
  

  // hideMenu ()
  //-----------------------
  //
  // WHAT IT DOES
  //
  // Hides the menu.
  // Hosts a hack.
  //
  $scope.hideMenu = function() {
    $scope.menuIsShown = false;
    menuIsPinned = false;

    // HACK - Omar
    // If we don't do this, the Menu will flash again.
    // There's something weird happening with the angular
    // digest loop that I'm unable to debug.
    // Try removing this and see for yourself.
    menuHasJustBeenShow = true;
    $timeout(function() { menuHasJustBeenShow = false; }, 800);
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
