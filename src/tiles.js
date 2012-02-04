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
