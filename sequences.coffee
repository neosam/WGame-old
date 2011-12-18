level = 0

testSequence = [
  {
    duration: 100
    cameraSpeed: [3, 0]
    layers: [
      {
        imagePaths: ['media/sequence-bg.png']
        startPosition: [0, 0]
        relativeSpeed: 0
        animationSpeed: 33
      }
      {
        imagePaths: ['media/sequence2.png']
        startPosition: [0, 0]
        relativeSpeed: 0.5
        animationSpeed: 33
      }
      {
        imagePaths: ['media/sequence1.png']
        startPosition: [0, 0]
        relativeSpeed: 1
        animationSpeed: 33
      }
      {
        imagePaths: ['media/sequence-staticfont.png']
        startPosition: [0, 0]
        relativeSpeed: 0
        animationSpeed: 33
      }
    ]
  }
]

loadPartSequence = (partSeq, func) ->
  newLevel = new Level 0, 0
  for layer in partSeq.layers
     bgLayer = new BackgroundImageLayer layer.images[0], \
                  layer.relativeSpeed ? 1, layer.animationSpeed ? 33
     for i in [1...layer.images.length]
        bgLayer.addImage layer.images
     newLevel.addLayer bgLayer
  level = newLevel
  window.setTimeout(func, partSeq.duration)


loadImagesForSequence = (seq) ->
  for partSeq in seq
    for layer in partSeq.layers
      images = new Array()
      for imagePath in layer.imagePaths
        loadedImg = new Image()
        loadedImg.onload = ->
        loadedImg.src = imagePath
        images.push loadedImg
      layer.images = images


loadSequence = (seq) ->
  loadImagesForSequence seq
  index = 0
  internalSequenceLoad = ->
    if index >= seq.length
      return
    partSeq = seq[index]
    index++
    loadPartSequence partSeq, internalSequenceLoad
  internalSequenceLoad()
  calculation = ->
    level.camera.x++


