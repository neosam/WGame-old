canvas=0
ctx=0
level=0
player=0

movementX = 0
movementY = 0

draw = ->
  #   player.moveNorth() if movementY < 0
  #   player.moveSouth() if movementY > 0
  #   player.moveWest() if movementX < 0
  #   player.moveEast() if movementX > 0
  #   level.camera.x = player.position[0] - (canvas.width - player.width) / 2
  #   level.camera.y = player.position[1] - (canvas.height - player.height) / 2
  calculation()
  level.draw()

calculation = ->

$(document).ready ->
  canvas = document.getElementById 'gamefield'
  if (!canvas.getContext)
    alert 'Could not initialize canvas.  Please download a real browser'
    return


  ctx = canvas.getContext '2d'
  backgroundImage = new Image()
  backgroundImage.src = 'media/mysticalBG.png'
  backgroundImage2 = new Image()
  backgroundImage2.src = 'media/mysticalBG2.png'
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
  #levelImg.onload = ->
  #  loader = loadTileFromImage levelImg
  #  tiles = loader.tiles
  #  bgLayer = new BackgroundImageLayer backgroundImage, 0.2, 11
  #  bgLayer.addImage backgroundImage2
  #  fgLayer = new BackgroundImageLayer fgImage, 5
  #  layer = new TileLayer 32, 32, tilesImg, tiles
  #  spriteLayer = new SpriteLayer()
  #  player = new Sprite tilesImg, 32, 32, tiles
  #  player.innerPos = [0, 10]
  #  player.position = [64, 64]
  #  playerAnimation =
  #    speed: 11
  #    positions: [
  #      [1,10], [2, 10]
  #    ]
  #  player.animations['dance'] = playerAnimation
  #  player.setAnimation 'dance'
  #  spriteLayer.addSprite player
  #  level = new Level 32, 32
  #  level.addLayer bgLayer
  #  level.addLayer layer
  #  level.addLayer spriteLayer
  #  #level.addLayer fgLayer
  #  $(window).keydown (event) ->
  #    doActionForKeyDown(event.which)
  #  $(window).keyup (event) ->
  #    doActionForKeyUp(event.which)
  #  window.setInterval 'draw()', 33
  level = new Level 0, 0
  calculation = loadSequence testSequence
  window.setInterval 'draw()', 33
  #levelImg.src = 'media/level.png'






