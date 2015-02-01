angular.module('uGame.game', [])

// GameController (controller)
//===============================
//
// WHAT IT DOES
//
// Controller for the Gameboy Color emulator.
// 

.controller('GameController', function($scope, $timeout, $stateParams, $location, $document, LxNotificationService, Game) {

  var gameIsLoaded = false;
  var gameIsPaused = false;
  var menuTimer = null;
  var menuIsPinned = false;

  // Temporary
  var state;

  // ALL KEY BINDINGS HERE
  var keyboardControllerKeys = {
    '39': 'right',
    '37': 'left',
    '38': 'up',
    '40': 'down',
    '88': 'a',
    '90': 'b',
    '16': 'select',
    '13': 'start'
  };

  // This var is used for a Hack in $scope.hideMenu()
  var menuHasJustBeenShow = false;

  $scope.menuIsShown = false;

  $scope.gameInfo = {
    title: 'Loading Game...'
  };

  // getAndStartGame ()
  //----------------
  //
  // WHAT IT DOES
  //
  // GETs the game from server and starts it into the emulator.
  //
  $scope.getAndStartGame = function() {
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
    getAndStartGame();
  };

  // goHome ()
  //-----------------
  //
  // WHAT IT DOES
  //
  // Routes the user back home page. Removes keyboard events.
  //
  $scope.goHome = function() {
    $document.off('keydown');
    $document.off('keyup');
    $location.path('/home');
  };


  // SAVE AND LOAD GAMES
  // -----------------------------

  $scope.saveCurrentGame = function() {
    LxNotificationService.notify('Saving Game...');
    state = $scope.API.saveFreezeState();
    Game.save({
      game_id: $stateParams.id,
      description: 'test',
      payload: state
    }).then(function(result) {
      if (result) {
        LxNotificationService.success('Game Saved Succesfully.');
      } else {
        LxNotificationService.error('There was problem saving your game.');
      }
    });  
  };

  $scope.loadPreviousGame = function(id) {
    LxNotificationService.notify('Loading Game...');
    Game.load($stateParams.id)
      .then(function(savedGame){
        if (savedGame) {          
          $scope.API.openFreezeState(savedGame.payload);
          LxNotificationService.success('Game Loaded Succesfully.');
        } else {
          LxNotificationService.notify('No Save Files found for Current Game.');          
        }
    });    
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
      }, 2500);      
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

  $scope.onKeyDown = function(key) {
    if (keyboardControllerKeys.hasOwnProperty(key)) {      
      $scope.API.keyDown(keyboardControllerKeys[key]);
    }
  };

  $scope.onKeyUp = function(key) {
    if (keyboardControllerKeys.hasOwnProperty(key)) {
      $scope.API.keyUp(keyboardControllerKeys[key]);
    }
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
.directive('uGameIframeOnload', function(){

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
})

.directive('uGameKeypressEvents', function($document) {
    return {
      scope: false,
      link: function(scope) {
        $document.on('keydown', function(e) {
          scope.onKeyDown(e.keyCode);          
        });

        $document.on('keyup', function(e) {
          scope.onKeyUp(e.keyCode);
        });
      }
    };
  }
);
