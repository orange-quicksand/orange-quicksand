var gameBoyAPI = {

  // dataUriOpen(String)
  //=====================
  // returns: null
  //
  // WHAT IT DOES
  //
  // It takes in an ESCAPED base64 enconded version of the ROM.
  // It thens loads the game and starts it.
  //
  dataUriOpen : function(datauri) {
    if (datauri != null && datauri.length > 0) {
      try {
        cout(Math.floor(datauri.length * 3 / 4) + " bytes of data submitted by form (text length of " + datauri.length + ").", 0);
        start(mainCanvas, base64_decode(datauri));
      }
      catch (error) {
        console.error(error.message);
      }
    }
  },
  
  // restart()
  //=====================
  // returns: null
  //
  // WHAT IT DOES
  //
  // It restarts the ROM that is currently running.
  // 
  restart : function() {
    if (GameBoyEmulatorInitialized()) {
      try {
        if (!gameboy.fromSaveState) {
          initPlayer();
          start(mainCanvas, gameboy.getROMImage());
        }
        else {
          initPlayer();
          openState(gameboy.savedStateFileName, mainCanvas);
        }
      }
      catch (error) {
        alert(error.message + " file: " + error.fileName + " line: " + error.lineNumber);
      }
    }
    else {
      cout("Could not restart, as a previous emulation session could not be found.", 1);
    }
  },

  // resume()
  //============
  // returns: null
  //
  // WHAT IT DOES
  //
  // It unpauses the game.
  //
  resume : function() {
    run();
  },

  // pause()
  //=====================
  // return: null
  //
  // WHAT IT DOES
  //
  // Function is alredy defined in global scope.
  pause: function() {
    pause();
  },

  // saveFreezeState()
  //=====================
  // returns: Array
  //
  // WHAT IT DOES
  //
  // It returns the current Freeze State of the game
  // as an Array.
  //
  saveFreezeState : function() {
    return gameboy.saveState();
  },
  
  // openFreezeState(Array)
  //=====================
  // returns: null
  //
  // WHAT IT DOES
  //
  // It returns the current Freeze State of the game
  // as an Array.
  //
  openFreezeState : function(state) {
    try {
      clearLastEmulation();
      cout("Attempting to run a saved emulation state.", 0);
      gameboy = new GameBoyCore(mainCanvas, "");        
      gameboy.returnFromState(state);
      run();      
    }
    catch (error) {
      cout("ERROR: "+ error.message + ". Could not open the saved emulation state.", 2);
    }
  },

  // fullScreenMode()
  //=====================
  // returns: null
  //
  // WHAT IT DOES
  //--------------
  // Game is displayed in fullscreen.
  //
  fullScreenMode : function() {
    fullscreenCanvas.className = "maximum";
    document.getElementById("fullscreenContainer").style.display = "block";
    $('.maximum').css('height', '100%');
    $('.maximum').css('width', window.innerHeight * 160 / 144 + 'px');
    gameboy.canvas = fullscreenCanvas;
    windowStacks[0].hide();
  },


  // init(String !!MUST BE BASE64 ENCONDED AND THEN ESCAPED AS A JS STRING!!)
  //=====================
  // returns: null
  // 
  // WHAT IT DOES
  //
  // Starts the emulator with the inputed game
  //
  init: function(base64ROM) {
    // For testing purposes only. Zelda will load up if no game has been inputed
    if (typeof base64ROM === 'string' && base64ROM.length > 500) {
      gameBoyAPI.dataUriOpen(base64ROM);
    } else {
      throw 'Invalid ROM.';
    }
  },

  // keyDown(String)
  //==============================
  // returns: null
  // 
  // WHAT IT DOES
  //
  // It tells the emulator to press down a key (THIS IS NOT A CLICK)
  //
  keyDown: function(key) {
    GameBoyKeyDown(key);
  },

  // keyup(String)
  //==============================
  // returns: null
  // 
  // WHAT IT DOES
  //
  // It tells the emulator to release a previously pressed key
  // This always goes after keyDown for the same key.
  //
  keyUp: function(key) {
    GameBoyKeyUp(key);
  }

};













