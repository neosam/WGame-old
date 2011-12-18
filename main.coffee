canvas=0
ctx=0
level=0
player=0

movementX = 0
movementY = 0

draw = ->
  calculation()
  level.draw()

calculation = ->

resetPlayerAnimation = ->
  if movementY < 0
    player.setAnimation 'goNorth'
  else if movementY > 0
    player.setAnimation 'goSouth'
  else if movementX < 0
    player.setAnimation 'goWest'
  else if movementX > 0
    player.setAnimation 'goEast'
  else
    player.setAnimation 'default'

prepareLevel1 = ->
  console.log 'prepare level 1'
  backgroundImage = new Image()
  backgroundImage.src = 'media/mysticalBG.png'
  backgroundImage2 = new Image()
  backgroundImage2.src = 'media/mysticalBG2.png'
  fgImage = new Image()
  fgImage.src = 'media/foreground.png'
  tilesImg = new Image()
  tilesImg.src = 'media/tiles.png'
  levelImg = new Image()
  setAction 'startGoNorth', -> movementY = -1; resetPlayerAnimation()
  setAction 'startGoSouth', -> movementY = 1; resetPlayerAnimation();
  setAction 'startGoWest', -> movementX = -1; resetPlayerAnimation();
  setAction 'startGoEast', -> movementX = 1; resetPlayerAnimation()
  setAction 'stopGoNorth', -> movementY = 0; resetPlayerAnimation()
  setAction 'stopGoSouth', -> movementY = 0; resetPlayerAnimation()
  setAction 'stopGoWest', -> movementX = 0; resetPlayerAnimation()
  setAction 'stopGoEast', -> movementX = 0; resetPlayerAnimation()
  levelImg.onload = ->
    loader = loadTileFromImage levelImg
    tiles = loader.tiles
    bgLayer = new BackgroundImageLayer backgroundImage, 0.2, 11
    bgLayer.addImage backgroundImage2
    fgLayer = new BackgroundImageLayer fgImage, 5
    layer = new TileLayer 32, 32, tilesImg, tiles
    spriteLayer = new SpriteLayer()
    player = new Sprite tilesImg, 32, 32, tiles
    player.innerPos = [0, 10]
    player.position = [64, 64]
    playerDanceAnimation =
      speed: 11
      positions: [
        [1,10], [2, 10]
      ]
    playerNorthAnimation =
      speed: 4
      positions: [
        [3,10], [4, 10]
      ]
    playerSouthAnimation =
      speed: 4
      positions: [
        [1,10], [2, 10]
      ]
    playerWestAnimation =
      speed: 4
      positions: [
        [7,10], [8, 10]
      ]
    playerEastAnimation =
      speed: 4
      positions: [
        [5,10], [6, 10]
      ]
    player.animations['dance'] = playerDanceAnimation
    player.animations['goSouth'] = playerSouthAnimation
    player.animations['goNorth'] = playerNorthAnimation
    player.animations['goWest'] = playerWestAnimation
    player.animations['goEast'] = playerEastAnimation
    player.setAnimation 'dance'
    spriteLayer.addSprite player
    level = new Level 32, 32
    level.addLayer bgLayer
    level.addLayer layer
    level.addLayer spriteLayer
    #level.addLayer fgLayer
    $(window).keydown (event) ->
      doActionForKeyDown(event.which)
    $(window).keyup (event) ->
      doActionForKeyUp(event.which)
    calculation = ->
     player.moveNorth() if movementY < 0
     player.moveSouth() if movementY > 0
     player.moveWest() if movementX < 0
     player.moveEast() if movementX > 0
     level.camera.x = player.position[0] - (canvas.width - player.width) / 2
     level.camera.y = player.position[1] - (canvas.height - player.height) / 2
  levelImg.src = 'media/level.png'

$(document).ready ->
  canvas = document.getElementById 'gamefield'
  if (!canvas.getContext)
    alert 'Could not initialize canvas.  Please download a real browser'
    return


  ctx = canvas.getContext '2d'
  level = new Level 0, 0
  calculation = loadSequence testSequence, ->
    prepareLevel1()
  window.setInterval 'draw()', 33






