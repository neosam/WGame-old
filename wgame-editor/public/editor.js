
if (typeof wg === "undefined" || wg === null) wg = [];

if (wg.editor == null) wg.editor = [];

wg.editor.selectionX = 0;

wg.editor.selectionY = 0;

wg.editor.action = 0;

$(document).ready(function() {
  wg.canvas = document.getElementById('editorfield');
  if (!wg.canvas.getContext) {
    alert('Can not initialize canvas please use firefox, chrome or opera');
    return;
  }
  wg.ctx = wg.canvas.getContext('2d');
  wg.level = new wg.Level(0, 0);
  window.setInterval('wg.draw()', 33);
  $('#tiles').click(function(event) {
    wg.editor.selectionX = Math.floor(event.offsetX / 32);
    wg.editor.selectionY = Math.floor(event.offsetY / 32);
    return console.log("Selected item: " + wg.editor.selectionX + "/" + wg.editor.selectionY);
  });
  $(wg.canvas).click(function(event) {
    var tile, walkable, x, y;
    x = event.offsetX + wg.level.camera.x;
    y = event.offsetY + wg.level.camera.y;
    console.log("Insert item at: " + x + "/" + y);
    switch (wg.editor.action) {
      case 1:
        walkable = $('#walkable')[0].checked;
        tile = wg.editor.tiles.getTileAtPixelPosition(x, y);
        tile.index = [wg.editor.selectionX, wg.editor.selectionY];
        tile.visible = true;
        return tile.walkable = walkable;
      case 2:
        tile = wg.editor.tiles.getTileAtPixelPosition(x, y);
        tile.visible = false;
        return tile.walkable = false;
    }
  });
  $(window).keydown(function(event) {
    return wg.doActionForKeyDown(event.which);
  });
  wg.actionFunctionTable['startGoNorth'] = function() {
    return wg.level.camera.y -= 32;
  };
  wg.actionFunctionTable['startGoSouth'] = function() {
    return wg.level.camera.y += 32;
  };
  wg.actionFunctionTable['startGoWest'] = function() {
    return wg.level.camera.x += 32;
  };
  return wg.actionFunctionTable['startGoEast'] = function() {
    return wg.level.camera.x -= 32;
  };
});

wg.editor.actionAddBackgroundLayer = function() {
  var animationSpeed, image, imagePath, layer, layers, name, relativeSpeed;
  layers = document.getElementById('layers');
  name = $('[name="addBGName"]')[0].value;
  imagePath = $('[name="addBGPath"]')[0].value;
  relativeSpeed = parseFloat($('[name="addBGRel"]')[0].value);
  animationSpeed = parseInt($('[name="addBGSpeed"]')[0].value);
  image = new Image();
  image.src = imagePath;
  layer = new wg.BackgroundImageLayer(image, relativeSpeed, animationSpeed);
  layer.editorName = name;
  layer.editorType = 'BackgroundLayer';
  layer.editorPaths = [imagePath];
  wg.level.addLayer(layer);
  layers.options.add(new Option(name, "" + layers.options.length));
  return $('#addBackgroundLayer').hide();
};

wg.editor.actionAddTileLayer = function() {
  var height, image, layer, layers, name, width;
  layers = document.getElementById('layers');
  name = $('[name="addTileName"]')[0].value;
  width = parseInt($('[name="addTileWidth"]')[0].value);
  height = parseInt($('[name="addTileHeight"]')[0].value);
  image = document.getElementById('tiles');
  wg.editor.tiles = new wg.Tiles(width, height);
  layer = new wg.TileLayer(32, 32, image, wg.editor.tiles);
  layer.editorName = name;
  layer.editorType = 'TileLayer';
  wg.level.addLayer(layer);
  layers.options.add(new Option(name, "" + layers.options.length));
  return $('#addTileLayer').hide();
};

wg.editor.actionAddSpriteLayer = function() {
  var image, layer, layers, name;
  layers = document.getElementById('layers');
  name = $('[name="addSpriteName"]')[0].value;
  image = document.getElementById('tiles');
  layer = new wg.SpriteLayer;
  layer.editorName = name;
  layer.editorType = 'SpriteLayer';
  wg.editor.spriteLayer = layer;
  wg.level.addLayer(layer);
  layers.options.add(new Option(name, "" + layers.options.length));
  return $('#addSpriteLayer').hide();
};

wg.editor.generateCode = function() {
  var insert, layer, res, _i, _len, _ref;
  res = {
    type: 'WGame Level',
    version: '0.1',
    tilesImage: 'media/tiles.png',
    tiles: wg.editor.tiles,
    layers: []
  };
  _ref = wg.level.layers;
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    layer = _ref[_i];
    insert = {
      name: layer.editorName,
      type: layer.editorType
    };
    switch (layer.editorType) {
      case 'BackgroundLayer':
        insert.animationSpeed = layer.animationSpeed;
        insert.relativeSpeed = layer.relativeSpeed;
        insert.imagePaths = layer.editorPaths;
        break;
      case 'TileLayer':
        insert.width = layer.width;
        insert.height = layer.height;
    }
    res.layers.push(insert);
  }
  return $('#levelOutput')[0].value = res.toJSONString();
};

wg.editor.importCode = function() {
  var code, data, i, image, insert, layer, layers, tiles, _i, _len, _ref, _ref2, _ref3, _ref4, _results;
  layers = document.getElementById('layers');
  layers.options.length = 0;
  code = $('#levelOutput')[0].value;
  data = code.parseJSON();
  console.log(data);
  document.getElementById('tiles').src = data.tilesImage;
  tiles = data.tiles;
  wg.level = new wg.Level(0, 0);
  _ref = data.layers;
  _results = [];
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    layer = _ref[_i];
    insert = null;
    switch (layer.type) {
      case 'BackgroundLayer':
        image = new Image();
        image.src = layer.imagePaths[0];
        insert = new wg.BackgroundImageLayer(image, layer.relativeSpeed, layer.animationSpeed);
        insert.editorPaths = layer.imagePaths;
        break;
      case 'TileLayer':
        image = document.getElementById('tiles');
        wg.editor.tiles = new wg.Tiles(data.tiles.width, data.tiles.height);
        for (i = 0, _ref2 = data.tiles.tiles.length; 0 <= _ref2 ? i < _ref2 : i > _ref2; 0 <= _ref2 ? i++ : i--) {
          wg.editor.tiles.tiles[i].index = data.tiles.tiles[i].index;
          wg.editor.tiles.tiles[i].visible = (_ref3 = data.tiles.tiles[i].visible) != null ? _ref3 : false;
          wg.editor.tiles.tiles[i].walkable = (_ref4 = data.tiles.tiles[i].walkable) != null ? _ref4 : false;
        }
        insert = new wg.TileLayer(32, 32, image, wg.editor.tiles);
        break;
      case 'SpriteLayer':
        insert = new wg.SpriteLayer();
        wg.editor.spriteLayer = insert;
    }
    insert.editorName = layer.name;
    insert.editorType = layer.type;
    wg.level.addLayer(insert);
    _results.push(layers.options.add(new Option(layer.name, "" + layers.options.length)));
  }
  return _results;
};
