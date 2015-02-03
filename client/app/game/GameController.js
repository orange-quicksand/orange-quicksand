angular.module('uGame.game', [])

// GameController (controller)
//===============================
//
// WHAT IT DOES
//
// Controller for the Gameboy Color emulator.
// 

.controller('GameController', function($scope, $timeout, $stateParams, $location, $document, LxNotificationService, LxDialogService, Game) {

  var gameIsLoaded = false;
  var gameIsPaused = false;
  var menuTimer = null;
  var menuIsPinned = false;

  // Temporary
  var state;

  // WebRTC Game Controller
  var genId = function () {
    return ("0000" + (Math.random()*Math.pow(36,4) << 0).toString(36)).slice(-4);
  };

  $scope.rtcId = genId();
  $scope.rtcUrl = 'http://ugame.herokuapp.com/gamepad.html?' + $scope.rtcId;

  $scope.setupPeer = function () {

    var controllerKeyCodes = {
      'right':  39,
      'left':   37,
      'up':     38,
      'down':   40,
      'a':      88,
      'b':      90,
      'select': 16,
      'start':  13
    };

    var peer = new Peer($scope.rtcId, {key: 'kus7eqqnljgzxgvi', debug: 3});
    console.log(peer);
    peer.on('connection', function (connection) {
      console.log('oncon');

      connection.on('open', function() {
        console.log('open');

        LxDialogService.close('controllers');
        LxNotificationService.notify('Phone connected!');

        connection.on('data', function(data) {


          var gamepad = data;
          
          if (gamepad.key === 'down') {
            console.log(controllerKeyCodes[gamepad.button]);
            console.log($scope.onKeyDown);
            $scope.onKeyDown(controllerKeyCodes[gamepad.button]);
          }
          if (gamepad.key === 'up') {
            console.log(controllerKeyCodes[gamepad.button]);
            $scope.onKeyUp(controllerKeyCodes[gamepad.button]);
          }
        });
      });
    });

  };



  // ALL KEY BINDINGS HERE
  //-------------------------------------
  //
  // Names of known key codes (0-255)
  var keyboardMap = ["","","","CANCEL","","","HELP","","BACK_SPACE","TAB","","","CLEAR","ENTER","RETURN","","SHIFT","CONTROL","ALT","PAUSE","CAPS_LOCK","KANA","EISU","JUNJA","FINAL","HANJA","","ESCAPE","CONVERT","NONCONVERT","ACCEPT","MODECHANGE","SPACE","PAGE_UP","PAGE_DOWN","END","HOME","LEFT","UP","RIGHT","DOWN","SELECT","PRINT","EXECUTE","PRINTSCREEN","INSERT","DELETE","","0","1","2","3","4","5","6","7","8","9","COLON","SEMICOLON","LESS_THAN","EQUALS","GREATER_THAN","QUESTION_MARK","AT","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","WIN","","CONTEXT_MENU","","SLEEP","NUMPAD0","NUMPAD1","NUMPAD2","NUMPAD3","NUMPAD4","NUMPAD5","NUMPAD6","NUMPAD7","NUMPAD8","NUMPAD9","MULTIPLY","ADD","SEPARATOR","SUBTRACT","DECIMAL","DIVIDE","F1","F2","F3","F4","F5","F6","F7","F8","F9","F10","F11","F12","F13","F14","F15","F16","F17","F18","F19","F20","F21","F22","F23","F24","","","","","","","","","NUM_LOCK","SCROLL_LOCK","WIN_OEM_FJ_JISHO","WIN_OEM_FJ_MASSHOU","WIN_OEM_FJ_TOUROKU","WIN_OEM_FJ_LOYA","WIN_OEM_FJ_ROYA","","","","","","","","","","CIRCUMFLEX","EXCLAMATION","DOUBLE_QUOTE","HASH","DOLLAR","PERCENT","AMPERSAND","UNDERSCORE","OPEN_PAREN","CLOSE_PAREN","ASTERISK","PLUS","PIPE","HYPHEN_MINUS","OPEN_CURLY_BRACKET","CLOSE_CURLY_BRACKET","TILDE","","","","","VOLUME_MUTE","VOLUME_DOWN","VOLUME_UP","","","SEMICOLON","EQUALS","COMMA","MINUS","PERIOD","SLASH","BACK_QUOTE","","","","","","","","","","","","","","","","","","","","","","","","","","","OPEN_BRACKET","BACK_SLASH","CLOSE_BRACKET","QUOTE","","META","ALTGR","","WIN_ICO_HELP","WIN_ICO_00","","WIN_ICO_CLEAR","","","WIN_OEM_RESET","WIN_OEM_JUMP","WIN_OEM_PA1","WIN_OEM_PA2","WIN_OEM_PA3","WIN_OEM_WSCTRL","WIN_OEM_CUSEL","WIN_OEM_ATTN","WIN_OEM_FINISH","WIN_OEM_COPY","WIN_OEM_AUTO","WIN_OEM_ENLW","WIN_OEM_BACKTAB","ATTN","CRSEL","EXSEL","EREOF","PLAY","ZOOM","","PA1","WIN_OEM_CLEAR",""];
  
  // Controller keys.
  $scope.keyboardControllerKeys = {
    '88': 'a',
    '90': 'b',
    '16': 'select',
    '13': 'start',
    '39': 'right',
    '37': 'left',
    '38': 'up',
    '40': 'down'
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
          $scope.setupPeer();

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
    $scope.getAndStartGame();
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
  

  // CONTROLLER
  //------------------
  //
  $scope.onKeyDown = function(key) {
    if ($scope.keyboardControllerKeys.hasOwnProperty(key)) {      
      $scope.API.keyDown($scope.keyboardControllerKeys[key]);
    }
  };

  $scope.onKeyUp = function(key) {
    if ($scope.keyboardControllerKeys.hasOwnProperty(key)) {
      $scope.API.keyUp($scope.keyboardControllerKeys[key]);
    }
  };

  $scope.openControllerDialog = function(dialog) {
    LxDialogService.open(dialog);
  };

  $scope.fromCharCodeToString = function(code) {
    return keyboardMap[code];
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
