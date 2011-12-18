level = 0

testSequence = [
  {
    duration: 4000
    cameraSpeed: [3, 0]
    cameraPosition: [0, 0]
    layers: [
      {
        imagePaths: ['media/sequence-bg.png']
        relativeSpeed: 0
        animationSpeed: 33
      }
      {
        imagePaths: ['media/sequence2.png']
        relativeSpeed: 0.5
        animationSpeed: 33
      }
      {
        imagePaths: ['media/sequence1.png']
        relativeSpeed: 1
        animationSpeed: 33
      }
      {
        imagePaths: ['media/sequence-staticfont.png']
        relativeSpeed: 0
        animationSpeed: 33
      }
    ]
  }
]

sequenceCameraSpeed = [0, 0]

loadPartSequence = (partSeq, func) ->
  newLevel = new Level 0, 0
  newLevel.camera.x = partSeq.cameraPosition[0]
  newLevel.camera.y = partSeq.cameraPosition[1]
  sequenceCameraSpeed = partSeq.cameraSpeed
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


loadSequence = (seq, func) ->
  loadImagesForSequence seq
  index = 0
  internalSequenceLoad = ->
    if index >= seq.length
      func()
      return
    partSeq = seq[index]
    index++
    loadPartSequence partSeq, internalSequenceLoad
  internalSequenceLoad()
  calculation = ->
    level.camera.x += sequenceCameraSpeed[0]
    level.camera.y += sequenceCameraSpeed[1]


