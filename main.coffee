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
class StaticImageLayer extends LevelLayer
  constructor: (@image) ->
  draw: (camera) -> ctx.drawImage(@image, camera.x, camera.y)


/* Where should which color point */
colorTileTable =
   '255 255 255': [0, 0],
   '0 0 0': [1, 0]

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
      tilePosition = colorTileTable["#{red} #{green} #{blue}"]
      tilePosition ?= [0, 0]
      tiles.getTileAt(x, y).index = tilePosition
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
  level.camera.x++
  level.draw()

$(document).ready ->
  canvas = document.getElementById 'gamefield'
  if (!canvas.getContext)
    alert 'Could not initialize canvas'
    return


  ctx = canvas.getContext '2d'
  image = new Image()
  image.src = 'media/logo.png'
  tilesImg = new Image()
  tilesImg.src = 'media/tiles.png'
  levelImg = new Image()
  levelImg.onload = ->
    loader = loadTileFromImage levelImg
    tiles = loader.tiles

    layer = new TileLayer 32, 32, tilesImg, tiles
    level = new Level 32, 32
    level.addLayer layer
    window.setInterval 'draw()', 33
  levelImg.src = 'media/level.png'






