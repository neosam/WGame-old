canvas=0
ctx=0
level=0

/* Defines drawing position */
class Camera
  constructor: (@x = 0, @y = 0) ->

/* Abstract class for a drawing layer */
class LevelLayer
  constructor: (@level)
  draw: (camera) ->

/* Just displays a static image */
class BackgroundImageLayer extends LevelLayer
  constructor: (@image, @relativeSpeed = 1) ->
  draw: (camera) ->
    originPosX = -((camera.x * @relativeSpeed) % @image.width)
    originPosY = -((camera.y * @relativeSpeed) % @image.height)
    rightBorder = originPosX + @image.width
    bottomBorder = originPosY + @image.height
    ctx.drawImage @image, originPosX, originPosY
    if rightBorder <= canvas.width
      ctx.drawImage @image, rightBorder, originPosY
    if bottomBorder <= canvas.height
      ctx.drawImage @image, originPosX, bottomBorder
    if rightBorder <= canvas.width and bottomBorder <= canvas.height
      ctx.drawImage @image, rightBorder, bottomBorder

/* KeyboardCodesDefinition */
KEY_UP = 38
KEY_DOWN = 40
KEY_RIGHT = 39
KEY_LEFT = 37
KEY_W = 87
KEY_S = 83
KEY_D = 68
KEY_A = 65
keyDefinition =
  38: 'KEY_UP'
  40: 'KEY_DOWN'
  39: 'KEY_RIGHT'
  37: 'KEY_LEFT'
  87: 'KEY_W'
  83: 'KEY_S'
  68: 'KEY_A'
  65: 'KEY_D'

/* Input Events */
inputToFunctionMapping =
  goNorth: ->
  goSouth: ->
  goEast: ->
  goWest: ->
/* KeyboardMappingTable */
keyboardMappingTable =
  KEY_UP: 'goNorth'
  KEY_DOWN: 'goSouth'
  KEY_RIGHT: 'goEast'
  KEY_LEFT: 'goWest'
  KEY_W: 'goNorth'
  KEY_S: 'goSouth'
  KEY_D: 'goEast'
  KEY_A: 'goWest'

getActionNameForKey = (key) -> keyboardMappingTable[keyDefinition[key]]
getActionForKey = (key) -> inputToFunctionMapping[keyboardMappingTable[keyDefinition[key]]]
doActionForKey = (key) -> getActionForKey(key)()
setAction = (action, func) -> inputToFunctionMapping[action] = func



/* Where should which color point */
colorTileTable =
   '255 255 255': {}
   '0 0 0':
      index: [1, 0]
   '255 0 255':
      walkable: false,
      visible: false

/* laod tiles and level data from an image */
loadTileFromImage = (image) ->
  tiles = new Tiles(image.width, image.height)
  fakeCanvas = $ '<canvas>'
  fakeCanvas[0].width = image.width
  fakeCanvas[0].height = image.height
  fakeCtx = fakeCanvas[0].getContext('2d')
  fakeCtx.drawImage(image, 0, 0)
  imageData = fakeCtx.getImageData(0, 0, image.width, image.height)
  pixelData = imageData.data
  for y in [0...image.height]
    for x in [0...image.width]
      index = y * image.height + x
      red = pixelData[index * 4]
      green = pixelData[index * 4 + 1]
      blue = pixelData[index * 4 + 2]
      tileData = colorTileTable["#{red} #{green} #{blue}"]
      tileData ?= {}
      tiles.getTileAt(x, y).index = tileData.index ? [0, 0]
      tiles.getTileAt(x, y).walkable = tileData.walkable ? false
      tiles.getTileAt(x, y).visible = tileData.visible ? true
  {tiles: tiles}



class Tiles
  constructor: (@width, @height) ->
    @tiles = new Array()
    @tiles.push {index: [0, 0]} for [0...@width * @height]
  getTileAt: (x, y) -> @tiles[y * @width + x]

class TileLayer extends LevelLayer
  constructor: (@tileWidth, @tileHeight, @tileImage, @tiles) ->
  draw: (camera) ->
    for y in [0...@tiles.height]
      for x in [0...@tiles.width]
        tile = @tiles.getTileAt(x, y)
        if !tile.visible
          continue
        tilePosX = tile.index[0] * @tileWidth
        tilePosY = tile.index[1] * @tileHeight
        drawX = x * @tileWidth - camera.x
        drawY = y * @tileHeight - camera.y
        ctx.drawImage @tileImage, tilePosX, tilePosY, \
                                  @tileWidth, @tileHeight, \
                                  drawX, drawY, \
                                  @tileWidth, @tileHeight



/* Stores the level */
class Level
  constructor: (@width, @height, @camera = new Camera()) ->
    @layers = new Array()
    @tiles = new Array()
  addLayer: (layer) ->
    @layers.push layer
  draw: -> layer.draw @camera for layer in @layers


draw = ->
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
  setAction 'goNorth', -> level.camera.y--
  setAction 'goSouth', -> level.camera.y++
  setAction 'goWest', -> level.camera.x--
  setAction 'goEast', -> level.camera.x++
  levelImg.onload = ->
    loader = loadTileFromImage levelImg
    tiles = loader.tiles
    bgLayer = new BackgroundImageLayer image, .2
    fgLayer = new BackgroundImageLayer fgImage, 5
    layer = new TileLayer 32, 32, tilesImg, tiles
    level = new Level 32, 32
    level.addLayer bgLayer
    level.addLayer layer
    level.addLayer fgLayer
    $(window).keydown (event) ->
      doActionForKey(event.which)
    window.setInterval 'draw()', 33
  levelImg.src = 'media/level.png'






