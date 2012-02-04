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

wg.Level.loadFromURL = function(url) {
  return wg.Level.loadFromObject($.get(url));
};

wg.Level.loadFromObject = function(obj) {
  var animationSpeed, dst, i, image, layer, level, mainTiles, relativeSpeed, result, src, tilesImg, _i, _len, _ref;
  level = new wg.Level();
  tilesImg = new Image();
  tilesImg.src = obj.tilesImage;
  mainTiles = new wg.Tiles(obj.tiles.width, obj.tiles.height);
  for (i = 0, _ref = obj.tiles.length; 0 <= _ref ? i < _ref : i > _ref; 0 <= _ref ? i++ : i--) {
    src = obj.tiles.tiles[i];
    dst = mainTiles.tiles[i];
    dst.index = src.index;
    if (dst.walkable == null) dst.walkable = src.walkable;
    if (dst.visible == null) dst.visible = src.visible;
  }
  for (_i = 0, _len = layers.length; _i < _len; _i++) {
    layer = layers[_i];
    result = null;
    switch (layer.type) {
      case "BackgroundLayer":
        image = new Image();
        image.src = layer.imagePaths[0];
        animationSpeed = parseInt(layer.animationSpeed);
        relativeSpeed = parseFloat(layer.relativeSpeed);
        result = new wg.BackgroundImageLayer(image, relativeSpeed, animationSpeed);
        break;
      case "TileLayer":
        result = new wg.TileLayer(0, 0, tileImg, mainTiles);
        break;
      case "SpriteLayer":
        result = new wg.SpriteLayer();
    }
    level.addLayer(result);
  }
  return wg.level = level;
};
