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
