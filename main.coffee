canvas=0
ctx=0
level=0




movementX = 0
movementY = 0

draw = ->
  level.camera.x += movementX
  level.camera.y += movementY
  level.draw()

$(document).ready ->
  canvas = document.getElementById 'gamefield'
  if (!canvas.getContext)
    alert 'Could not initialize canvas'
    return


  ctx = canvas.getContext '2d'
  image = new Image()
  image.src = 'media/logo.png'
  fgImage = new Image()
  fgImage.src = 'media/foreground.png'
  tilesImg = new Image()
  tilesImg.src = 'media/tiles.png'
  levelImg = new Image()
  setAction 'startGoNorth', -> movementY = -1
  setAction 'startGoSouth', -> movementY = 1
  setAction 'startGoWest', -> movementX = -1
  setAction 'startGoEast', -> movementX = 1
  setAction 'stopGoNorth', -> movementY = 0
  setAction 'stopGoSouth', -> movementY = 0
  setAction 'stopGoWest', -> movementX = 0
  setAction 'stopGoEast', -> movementX = 0
  levelImg.onload = ->
    loader = loadTileFromImage levelImg
    tiles = loader.tiles
    bgLayer = new BackgroundImageLayer image, 0.2
    fgLayer = new BackgroundImageLayer fgImage, 5
    layer = new TileLayer 32, 32, tilesImg, tiles
    level = new Level 32, 32
    level.addLayer bgLayer
    level.addLayer layer
    level.addLayer fgLayer
    $(window).keydown (event) ->
      doActionForKeyDown(event.which)
    $(window).keyup (event) ->
      doActionForKeyUp(event.which)
    window.setInterval 'draw()', 33
  levelImg.src = 'media/level.png'






