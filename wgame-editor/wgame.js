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
var _class,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

if (typeof wg === "undefined" || wg === null) wg = new Object();

wg.Camera = (function() {

  function Camera(x, y) {
    this.x = x != null ? x : 0;
    this.y = y != null ? y : 0;
  }

  return Camera;

})();

wg.Level = (function() {

  function Level(width, height, camera) {
    this.width = width;
    this.height = height;
    this.camera = camera != null ? camera : new wg.Camera();
    this.layers = new Array();
    this.tiles = new Array();
  }

  Level.prototype.addLayer = function(layer) {
    return this.layers.push(layer);
  };

  Level.prototype.draw = function() {
    var layer, _i, _len, _ref, _results;
    _ref = this.layers;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      layer = _ref[_i];
      _results.push(layer.draw(this.camera));
    }
    return _results;
  };

  return Level;

})();

wg.LevelLayer = (function() {

  function LevelLayer() {
    _class.apply(this, arguments);
  }

  _class = LevelLayer.level;

  LevelLayer.prototype.draw = function(camera) {};

  return LevelLayer;

})();

wg.BackgroundImageLayer = (function(_super) {

  __extends(BackgroundImageLayer, _super);

  function BackgroundImageLayer(image, relativeSpeed, animationSpeed) {
    this.image = image;
    this.relativeSpeed = relativeSpeed != null ? relativeSpeed : 1;
    this.animationSpeed = animationSpeed != null ? animationSpeed : 33;
    this.images = new Array();
    this.images.push(this.image);
    this.tick = 0;
    this.animationIndex = 0;
  }

  BackgroundImageLayer.prototype.draw = function(camera) {
    var bottomBorder, originPosX, originPosY, rightBorder;
    this.animation();
    originPosX = -((camera.x * this.relativeSpeed + this.image.width * 100) % this.image.width);
    originPosY = -((camera.y * this.relativeSpeed + this.image.height * 100) % this.image.height);
    rightBorder = originPosX + this.image.width;
    bottomBorder = originPosY + this.image.height;
    wg.ctx.drawImage(this.image, originPosX, originPosY);
    if (rightBorder <= wg.canvas.width) {
      wg.ctx.drawImage(this.image, rightBorder, originPosY);
    }
    if (bottomBorder <= wg.canvas.height) {
      wg.ctx.drawImage(this.image, originPosX, bottomBorder);
    }
    if (rightBorder <= wg.canvas.width && bottomBorder <= wg.canvas.height) {
      return wg.ctx.drawImage(this.image, rightBorder, bottomBorder);
    }
  };

  BackgroundImageLayer.prototype.animation = function() {
    this.tick++;
    if (this.tick > this.animationSpeed) {
      this.tick = 0;
      this.animationIndex = (this.animationIndex + 1) % this.images.length;
      return this.image = this.images[this.animationIndex];
    }
  };

  BackgroundImageLayer.prototype.addImage = function(image) {
    return this.images.push(image);
  };

  return BackgroundImageLayer;

})(wg.LevelLayer);

wg.Level.loadFromURL = function(url, func) {
  var levelCode;
  levelCode = "";
  return $.ajax({
    url: level.js,
    context: levelCode,
    success: function() {
      return alert(levelCode);
    }
  });
};
var testSequence;

if (typeof wg === "undefined" || wg === null) wg = new Object();

testSequence = [
  {
    duration: 4000,
    cameraSpeed: [3, 0],
    cameraPosition: [0, 0],
    layers: [
      {
        imagePaths: ['media/sequence-bg.png'],
        relativeSpeed: 0,
        animationSpeed: 33
      }, {
        imagePaths: ['media/sequence2.png'],
        relativeSpeed: 0.5,
        animationSpeed: 33
      }, {
        imagePaths: ['media/sequence1.png'],
        relativeSpeed: 1,
        animationSpeed: 33
      }, {
        imagePaths: ['media/sequence-staticfont.png'],
        relativeSpeed: 0,
        animationSpeed: 33
      }
    ]
  }, {
    duration: 4000,
    cameraSpeed: [0, 0.1],
    cameraPosition: [200, 0],
    layers: [
      {
        imagePaths: ['media/sequence-bg.png'],
        relativeSpeed: 0,
        animationSpeed: 33
      }, {
        imagePaths: ['media/sequence2.png'],
        relativeSpeed: 0.5,
        animationSpeed: 33
      }, {
        imagePaths: ['media/sequence1.png'],
        relativeSpeed: 1,
        animationSpeed: 33
      }, {
        imagePaths: ['media/sequence-staticfont.png'],
        relativeSpeed: 0,
        animationSpeed: 33
      }
    ]
  }
];

wg.sequenceCameraSpeed = [0, 0];

wg.loadPartSequence = function(partSeq, func) {
  var bgLayer, i, layer, newLevel, _i, _len, _ref, _ref2, _ref3, _ref4;
  newLevel = new wg.Level(0, 0);
  newLevel.camera.x = partSeq.cameraPosition[0];
  newLevel.camera.y = partSeq.cameraPosition[1];
  wg.sequenceCameraSpeed = partSeq.cameraSpeed;
  _ref = partSeq.layers;
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    layer = _ref[_i];
    bgLayer = new wg.BackgroundImageLayer(layer.images[0], (_ref2 = layer.relativeSpeed) != null ? _ref2 : 1, (_ref3 = layer.animationSpeed) != null ? _ref3 : 33);
    for (i = 1, _ref4 = layer.images.length; 1 <= _ref4 ? i < _ref4 : i > _ref4; 1 <= _ref4 ? i++ : i--) {
      bgLayer.addImage(layer.images[i]);
    }
    newLevel.addLayer(bgLayer);
  }
  wg.level = newLevel;
  return window.setTimeout(func, partSeq.duration);
};

wg.loadImagesForSequence = function(seq) {
  var imagePath, images, layer, loadedImg, partSeq, _i, _len, _results;
  _results = [];
  for (_i = 0, _len = seq.length; _i < _len; _i++) {
    partSeq = seq[_i];
    _results.push((function() {
      var _j, _k, _len2, _len3, _ref, _ref2, _results2;
      _ref = partSeq.layers;
      _results2 = [];
      for (_j = 0, _len2 = _ref.length; _j < _len2; _j++) {
        layer = _ref[_j];
        images = new Array();
        _ref2 = layer.imagePaths;
        for (_k = 0, _len3 = _ref2.length; _k < _len3; _k++) {
          imagePath = _ref2[_k];
          loadedImg = new Image();
          loadedImg.onload = function() {};
          loadedImg.src = imagePath;
          images.push(loadedImg);
        }
        _results2.push(layer.images = images);
      }
      return _results2;
    })());
  }
  return _results;
};

wg.loadSequence = function(seq, func) {
  var index, internalSequenceLoad;
  wg.loadImagesForSequence(seq);
  index = 0;
  internalSequenceLoad = function() {
    var partSeq;
    if (index >= seq.length) {
      func();
      return;
    }
    partSeq = seq[index];
    index++;
    return wg.loadPartSequence(partSeq, internalSequenceLoad);
  };
  internalSequenceLoad();
  return wg.calculation = function() {
    wg.level.camera.x += wg.sequenceCameraSpeed[0];
    return wg.level.camera.y += wg.sequenceCameraSpeed[1];
  };
};
var __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

if (typeof wg === "undefined" || wg === null) wg = new Object();

wg.Sprite = (function() {

  function Sprite(image, width, height, tiles) {
    this.image = image;
    this.width = width;
    this.height = height;
    this.tiles = tiles;
    this.position = [0, 0];
    this.innerPos = [0, 0];
    this.animations = {
      "default": {
        speed: 1,
        positions: [[0, 10]]
      }
    };
    this.setAnimation('default');
  }

  Sprite.prototype.setAnimation = function(animationName) {
    var _ref;
    if (animationName === this.animationName) return;
    this.animationName = animationName;
    this.animation = (_ref = this.animations[animationName]) != null ? _ref : this.animations['default'];
    this.animationTick = this.animation.speed;
    return this.animationIndex = this.animation.positions.length;
  };

  Sprite.prototype.animate = function() {
    this.animationTick++;
    if (this.animationTick >= this.animation.speed) {
      this.animationIndex = (this.animationIndex + 1) % this.animation.positions.length;
      this.innerPos = this.animation.positions[this.animationIndex];
      return this.animationTick = 0;
    }
  };

  Sprite.prototype.draw = function(camera) {
    this.animate();
    return wg.ctx.drawImage(this.image, this.innerPos[0] * this.width, this.innerPos[1] * this.height, this.width, this.height, this.position[0] - camera.x, this.position[1] - camera.y, this.width, this.height);
  };

  Sprite.prototype.moveNorth = function() {
    return this.moveTo(this.position[0], this.position[1] - 4);
  };

  Sprite.prototype.moveSouth = function() {
    return this.moveTo(this.position[0], this.position[1] + 4);
  };

  Sprite.prototype.moveWest = function() {
    return this.moveTo(this.position[0] - 4, this.position[1]);
  };

  Sprite.prototype.moveEast = function() {
    return this.moveTo(this.position[0] + 4, this.position[1]);
  };

  Sprite.prototype.moveTo = function(x, y) {
    var _ref;
    if (this.isFieldPossible(x, y)) {
      return _ref = [x, y], this.position[0] = _ref[0], this.position[1] = _ref[1], _ref;
    }
  };

  Sprite.prototype.isFieldPossible = function(x, y) {
    return this.tiles.getTileAtPixelPosition(x, y).walkable && this.tiles.getTileAtPixelPosition(x + this.width - 1, y).walkable && this.tiles.getTileAtPixelPosition(x, y + this.height - 1).walkable && this.tiles.getTileAtPixelPosition(x + this.width, y + this.height - 1).walkable;
  };

  return Sprite;

})();

wg.Enemy = (function(_super) {

  __extends(Enemy, _super);

  function Enemy(image, width, height, tiles) {
    Enemy.__super__.constructor.call(this, image, width, height, tiles);
    this.movement = 0;
    this.activity = 0.03;
  }

  Enemy.prototype.draw = function(camera) {
    if (Math.random() < this.activity) this.doAI();
    this.move();
    return Enemy.__super__.draw.call(this, camera);
  };

  Enemy.prototype.doAI = function() {
    if (this.movement !== 0) {
      this.movement = 0;
      return this.setAnimation('dance');
    } else {
      this.movement = Math.floor(Math.random() * 4 + 1);
      switch (this.movement) {
        case 1:
          return this.setAnimation('goNorth');
        case 2:
          return this.setAnimation('goSouth');
        case 3:
          return this.setAnimation('goEast');
        case 4:
          return this.setAnimation('goWest');
      }
    }
  };

  Enemy.prototype.move = function() {
    switch (this.movement) {
      case 1:
        return this.moveNorth();
      case 2:
        return this.moveSouth();
      case 3:
        return this.moveEast();
      case 4:
        return this.moveWest();
    }
  };

  return Enemy;

})(wg.Sprite);

wg.SpriteLayer = (function(_super) {

  __extends(SpriteLayer, _super);

  function SpriteLayer() {
    this.sprites = new Array();
  }

  SpriteLayer.prototype.addSprite = function(sprite) {
    return this.sprites.push(sprite);
  };

  SpriteLayer.prototype.draw = function(camera) {
    var sprite, _i, _len, _ref, _results;
    _ref = this.sprites;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      sprite = _ref[_i];
      _results.push(sprite.draw(camera));
    }
    return _results;
  };

  return SpriteLayer;

})(wg.LevelLayer);
var __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

if (typeof wg === "undefined" || wg === null) wg = new Object();

wg.colorTileTable = {
  '255 255 255': {},
  '0 0 0': {
    index: [1, 0],
    walkable: true
  },
  '1 1 1': {
    index: [2, 0],
    walkable: true
  },
  '2 2 2': {
    index: [3, 0],
    walkable: true
  },
  '3 3 3': {
    index: [1, 1],
    walkable: true
  },
  '4 4 4': {
    index: [2, 1],
    walkable: true
  },
  '5 5 5': {
    index: [3, 1],
    walkable: true
  },
  '6 6 6': {
    index: [1, 2],
    walkable: true
  },
  '7 7 7': {
    index: [2, 2],
    walkable: true
  },
  '8 8 8': {
    index: [3, 2],
    walkable: true
  },
  '9 9 9': {
    index: [4, 1],
    walkable: true
  },
  '16 16 16': {
    index: [1, 3],
    walkable: true
  },
  '17 17 17': {
    index: [2, 3],
    walkable: true
  },
  '18 18 18': {
    index: [3, 3],
    walkable: true
  },
  '19 19 19': {
    index: [1, 4],
    walkable: true
  },
  '20 20 20': {
    index: [2, 4],
    walkable: true
  },
  '21 21 21': {
    index: [3, 4],
    walkable: true
  },
  '22 22 22': {
    index: [1, 5],
    walkable: true
  },
  '23 23 23': {
    index: [2, 5],
    walkable: true
  },
  '24 24 24': {
    index: [3, 5],
    walkable: true
  },
  '25 25 25': {
    index: [4, 4],
    walkable: true
  },
  '32 32 32': {
    index: [7, 0],
    walkable: true
  },
  '33 33 33': {
    index: [8, 0],
    walkable: true
  },
  '34 34 34': {
    index: [9, 0],
    walkable: true
  },
  '35 35 35': {
    index: [7, 1],
    walkable: true
  },
  '36 36 36': {
    index: [8, 1],
    walkable: true
  },
  '37 37 37': {
    index: [9, 1],
    walkable: true
  },
  '38 38 38': {
    index: [7, 2],
    walkable: true
  },
  '39 39 39': {
    index: [8, 2],
    walkable: true
  },
  '40 40 40': {
    index: [9, 2],
    walkable: true
  },
  '41 41 41': {
    index: [4, 1],
    walkable: true
  },
  '255 0 255': {
    visible: false
  }
};

wg.loadTileFromImage = function(image) {
  var blue, fakeCanvas, fakeCtx, green, imageData, index, pixelData, red, tileData, tiles, x, y, _ref, _ref2, _ref3, _ref4, _ref5;
  tiles = new wg.Tiles(image.width, image.height);
  fakeCanvas = $('<canvas>');
  fakeCanvas[0].width = image.width;
  fakeCanvas[0].height = image.height;
  fakeCtx = fakeCanvas[0].getContext('2d');
  fakeCtx.drawImage(image, 0, 0);
  imageData = fakeCtx.getImageData(0, 0, image.width, image.height);
  pixelData = imageData.data;
  for (y = 0, _ref = image.height; 0 <= _ref ? y < _ref : y > _ref; 0 <= _ref ? y++ : y--) {
    for (x = 0, _ref2 = image.width; 0 <= _ref2 ? x < _ref2 : x > _ref2; 0 <= _ref2 ? x++ : x--) {
      index = y * image.height + x;
      red = pixelData[index * 4];
      green = pixelData[index * 4 + 1];
      blue = pixelData[index * 4 + 2];
      tileData = wg.colorTileTable["" + red + " " + green + " " + blue];
      if (tileData == null) tileData = {};
      tiles.getTileAt(x, y).index = (_ref3 = tileData.index) != null ? _ref3 : [0, 0];
      tiles.getTileAt(x, y).walkable = (_ref4 = tileData.walkable) != null ? _ref4 : false;
      tiles.getTileAt(x, y).visible = (_ref5 = tileData.visible) != null ? _ref5 : true;
    }
  }
  return {
    tiles: tiles
  };
};

wg.Tiles = (function() {

  function Tiles(width, height) {
    var _i, _ref;
    this.width = width;
    this.height = height;
    this.tiles = new Array();
    for (_i = 0, _ref = this.width * this.height; 0 <= _ref ? _i < _ref : _i > _ref; 0 <= _ref ? _i++ : _i--) {
      this.tiles.push({
        index: [0, 0]
      });
    }
  }

  Tiles.prototype.getTileAt = function(x, y) {
    return this.tiles[y * this.width + x];
  };

  Tiles.prototype.getTileAtPixelPosition = function(x, y) {
    return this.getTileAt(Math.floor(x / this.width), Math.floor(y / this.height));
  };

  return Tiles;

})();

wg.TileLayer = (function(_super) {

  __extends(TileLayer, _super);

  function TileLayer(tileWidth, tileHeight, tileImage, tiles) {
    this.tileWidth = tileWidth;
    this.tileHeight = tileHeight;
    this.tileImage = tileImage;
    this.tiles = tiles;
  }

  TileLayer.prototype.draw = function(camera) {
    var drawX, drawY, tile, tilePosX, tilePosY, x, y, _ref, _results;
    _results = [];
    for (y = 0, _ref = this.tiles.height; 0 <= _ref ? y < _ref : y > _ref; 0 <= _ref ? y++ : y--) {
      _results.push((function() {
        var _ref2, _results2;
        _results2 = [];
        for (x = 0, _ref2 = this.tiles.width; 0 <= _ref2 ? x < _ref2 : x > _ref2; 0 <= _ref2 ? x++ : x--) {
          tile = this.tiles.getTileAt(x, y);
          if (!tile.visible) continue;
          tilePosX = tile.index[0] * this.tileWidth;
          tilePosY = tile.index[1] * this.tileHeight;
          drawX = x * this.tileWidth - camera.x;
          drawY = y * this.tileHeight - camera.y;
          _results2.push(wg.ctx.drawImage(this.tileImage, tilePosX, tilePosY, this.tileWidth, this.tileHeight, drawX, drawY, this.tileWidth, this.tileHeight));
        }
        return _results2;
      }).call(this));
    }
    return _results;
  };

  return TileLayer;

})(wg.LevelLayer);
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
