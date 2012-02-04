
if (typeof wg === "undefined" || wg === null) wg = new Object();

wg.canvas = 0;

wg.ctx = 0;

wg.level = 0;

wg.player = 0;

wg.movementX = 0;

wg.movementY = 0;

wg.draw = function() {
  wg.calculation();
  return wg.level.draw();
};

wg.calculation = function() {};

wg.finalPositions = [];

wg.finalPositionAction = function() {};

wg.compareFinalPositions = function(playerPos, finalPos) {
  return Math.floor(playerPos[0] / wg.player.width) === finalPos[0] && Math.floor(playerPos[1] / wg.player.height) === finalPos[1];
};

wg.defaultLevelCalculation = function() {
  var finalPosition, _i, _len, _ref;
  if (wg.movementY < 0) wg.player.moveNorth();
  if (wg.movementY > 0) wg.player.moveSouth();
  if (wg.movementX < 0) wg.player.moveWest();
  if (wg.movementX > 0) wg.player.moveEast();
  wg.level.camera.x = wg.player.position[0] - (wg.canvas.width - wg.player.width) / 2;
  wg.level.camera.y = wg.player.position[1] - (wg.canvas.height - wg.player.height) / 2;
  _ref = wg.finalPositions;
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    finalPosition = _ref[_i];
    if (wg.compareFinalPositions(wg.player.position, finalPosition)) {
      wg.finalPositionAction();
      return;
    }
  }
};

wg.resetPlayerAnimation = function() {
  if (wg.movementY < 0) {
    return wg.player.setAnimation('goNorth');
  } else if (wg.movementY > 0) {
    return wg.player.setAnimation('goSouth');
  } else if (wg.movementX < 0) {
    return wg.player.setAnimation('goWest');
  } else if (wg.movementX > 0) {
    return wg.player.setAnimation('goEast');
  } else {
    return wg.player.setAnimation('default');
  }
};

wg.prepareLevel = function() {
  var backgroundImage, backgroundImage2, fgImage, levelImg, tilesImg;
  console.log('prepare level 1');
  backgroundImage = new Image();
  backgroundImage.src = 'media/mysticalBG.png';
  backgroundImage2 = new Image();
  backgroundImage2.src = 'media/mysticalBG2.png';
  fgImage = new Image();
  fgImage.src = 'media/foreground.png';
  tilesImg = new Image();
  tilesImg.src = 'media/tiles.png';
  levelImg = new Image();
  wg.setAction('startGoNorth', function() {
    wg.movementY = -1;
    return wg.resetPlayerAnimation();
  });
  wg.setAction('startGoSouth', function() {
    wg.movementY = 1;
    return wg.resetPlayerAnimation();
  });
  wg.setAction('startGoWest', function() {
    wg.movementX = -1;
    return wg.resetPlayerAnimation();
  });
  wg.setAction('startGoEast', function() {
    wg.movementX = 1;
    return wg.resetPlayerAnimation();
  });
  wg.setAction('stopGoNorth', function() {
    wg.movementY = 0;
    return wg.resetPlayerAnimation();
  });
  wg.setAction('stopGoSouth', function() {
    wg.movementY = 0;
    return wg.resetPlayerAnimation();
  });
  wg.setAction('stopGoWest', function() {
    wg.movementX = 0;
    return wg.resetPlayerAnimation();
  });
  wg.setAction('stopGoEast', function() {
    wg.movementX = 0;
    return wg.resetPlayerAnimation();
  });
  levelImg.onload = function() {
    var bgLayer, enemy, enemyDanceAnimation, enemyDefaultAnimation, enemyEastAnimation, enemyNorthAnimation, enemySouthAnimation, enemyWestAnimation, fgLayer, layer, level, loader, player, playerDanceAnimation, playerEastAnimation, playerNorthAnimation, playerSouthAnimation, playerWestAnimation, spriteLayer, tiles;
    loader = wg.loadTileFromImage(levelImg);
    tiles = loader.tiles;
    bgLayer = new wg.BackgroundImageLayer(backgroundImage, 1, 33);
    bgLayer.addImage(backgroundImage2);
    fgLayer = new wg.BackgroundImageLayer(fgImage, 5);
    layer = new wg.TileLayer(32, 32, tilesImg, tiles);
    spriteLayer = new wg.SpriteLayer();
    enemy = new wg.Enemy(tilesImg, 32, 32, tiles);
    enemy.innerPos = [0, 10];
    enemy.position = [64, 64];
    enemyDanceAnimation = {
      speed: 11,
      positions: [[1, 11], [2, 11]]
    };
    enemyNorthAnimation = {
      speed: 4,
      positions: [[3, 11], [4, 11]]
    };
    enemySouthAnimation = {
      speed: 4,
      positions: [[1, 11], [2, 11]]
    };
    enemyWestAnimation = {
      speed: 4,
      positions: [[7, 11], [8, 11]]
    };
    enemyEastAnimation = {
      speed: 4,
      positions: [[5, 11], [6, 11]]
    };
    enemyDefaultAnimation = {
      speed: 11,
      positions: [[0, 11]]
    };
    enemy.animations['dance'] = enemyDanceAnimation;
    enemy.animations['goSouth'] = enemySouthAnimation;
    enemy.animations['goNorth'] = enemyNorthAnimation;
    enemy.animations['goWest'] = enemyWestAnimation;
    enemy.animations['goEast'] = enemyEastAnimation;
    enemy.animations['default'] = enemyDefaultAnimation;
    player = new wg.Sprite(tilesImg, 32, 32, tiles);
    player.innerPos = [0, 10];
    player.position = [64, 64];
    playerDanceAnimation = {
      speed: 11,
      positions: [[1, 10], [2, 10]]
    };
    playerNorthAnimation = {
      speed: 4,
      positions: [[3, 10], [4, 10]]
    };
    playerSouthAnimation = {
      speed: 4,
      positions: [[1, 10], [2, 10]]
    };
    playerWestAnimation = {
      speed: 4,
      positions: [[7, 10], [8, 10]]
    };
    playerEastAnimation = {
      speed: 4,
      positions: [[5, 10], [6, 10]]
    };
    player.animations['dance'] = playerDanceAnimation;
    player.animations['goSouth'] = playerSouthAnimation;
    player.animations['goNorth'] = playerNorthAnimation;
    player.animations['goWest'] = playerWestAnimation;
    player.animations['goEast'] = playerEastAnimation;
    player.setAnimation('dance');
    wg.player = player;
    spriteLayer.addSprite(player);
    spriteLayer.addSprite(enemy);
    level = new wg.Level(32, 32);
    level.addLayer(bgLayer);
    level.addLayer(layer);
    level.addLayer(spriteLayer);
    wg.level = level;
    $(window).keydown(function(event) {
      return wg.doActionForKeyDown(event.which);
    });
    $(window).keyup(function(event) {
      return wg.doActionForKeyUp(event.which);
    });
    wg.calculation = wg.defaultLevelCalculation;
    wg.finalPositionAction = function() {};
    return wg.finalPositions = [[6, 25]];
  };
  return levelImg.src = 'media/level.png';
};

wg.basicInit = function() {
  wg.canvas = document.getElementById('gamefield');
  if (!wg.canvas.getContext) {
    alert('Could not initialize canvas.  Please download a real browser');
    return;
  }
  wg.ctx = wg.canvas.getContext('2d');
  wg.level = new wg.Level(0, 0);
  wg.calculation = wg.loadSequence(testSequence, function() {
    return wg.prepareLevel();
  });
  return window.setInterval('wg.draw()', 33);
};
