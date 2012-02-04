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
