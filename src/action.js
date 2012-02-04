(function() {

  if (typeof wg === "undefined" || wg === null) wg = new Object();

  wg.keyDefinition = {
    38: 'KEY_UP',
    40: 'KEY_DOWN',
    39: 'KEY_RIGHT',
    37: 'KEY_LEFT',
    87: 'KEY_W',
    83: 'KEY_S',
    68: 'KEY_A',
    65: 'KEY_D'
  };

  wg.actionFunctionTable = {
    startGoNorth: function() {},
    startGoSouth: function() {},
    startGoEast: function() {},
    startGoWest: function() {}
  };

  wg.keydownActionTable = {
    KEY_UP: 'startGoNorth',
    KEY_DOWN: 'startGoSouth',
    KEY_RIGHT: 'startGoEast',
    KEY_LEFT: 'startGoWest',
    KEY_W: 'startGoNorth',
    KEY_S: 'startGoSouth',
    KEY_D: 'startGoEast',
    KEY_A: 'startGoWest'
  };

  wg.keyupActionTable = {
    KEY_UP: 'stopGoNorth',
    KEY_DOWN: 'stopGoSouth',
    KEY_RIGHT: 'stopGoEast',
    KEY_LEFT: 'stopGoWest',
    KEY_W: 'stopGoNorth',
    KEY_S: 'stopGoSouth',
    KEY_D: 'stopGoEast',
    KEY_A: 'stopGoWest'
  };

  /* action helper functions
  */

  wg.getActionNameForKeyDown = function(key) {
    return wg.keydownActionTable[wg.keyDefinition[key]];
  };

  wg.getActionNameForKeyUp = function(key) {
    return wg.keyupActionTable[wg.keyDefinition[key]];
  };

  wg.getActionForKeyDown = function(key) {
    return wg.actionFunctionTable[wg.keydownActionTable[wg.keyDefinition[key]]];
  };

  wg.getActionForKeyUp = function(key) {
    return wg.actionFunctionTable[wg.keyupActionTable[wg.keyDefinition[key]]];
  };

  wg.doActionForKeyDown = function(key) {
    var _base;
    return typeof (_base = wg.getActionForKeyDown(key)) === "function" ? _base() : void 0;
  };

  wg.doActionForKeyUp = function(key) {
    var _base;
    return typeof (_base = wg.getActionForKeyUp(key)) === "function" ? _base() : void 0;
  };

  wg.setAction = function(action, func) {
    return wg.actionFunctionTable[action] = func;
  };

}).call(this);
