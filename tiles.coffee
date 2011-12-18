# Where should which color point
colorTileTable =
  '255 255 255': {}
  '0 0 0':
    index: [1, 0]
    walkable: true
  '1 1 1':
    index: [2, 0]
    walkable: true
  '2 2 2':
    index: [3, 0]
    walkable: true
  '3 3 3':
    index: [1, 1]
    walkable: true
  '4 4 4':
    index: [2, 1]
    walkable: true
  '5 5 5':
    index: [3, 1]
    walkable: true
  '6 6 6':
    index: [1, 2]
    walkable: true
  '7 7 7':
    index: [2, 2]
    walkable: true
  '8 8 8':
    index: [3, 2]
    walkable: true
  '9 9 9':
    index: [4, 1]
    walkable: true
  '16 16 16':
    index: [1, 3]
    walkable: true
  '17 17 17':
    index: [2, 3]
    walkable: true
  '18 18 18':
    index: [3, 3]
    walkable: true
  '19 19 19':
    index: [1, 4]
    walkable: true
  '20 20 20':
    index: [2, 4]
    walkable: true
  '21 21 21':
    index: [3, 4]
    walkable: true
  '22 22 22':
    index: [1, 5]
    walkable: true
  '23 23 23':
    index: [2, 5]
    walkable: true
  '24 24 24':
    index: [3, 5]
    walkable: true
  '25 25 25':
    index: [4, 4]
    walkable: true
  '32 32 32':
    index: [7, 0]
    walkable: true
  '33 33 33':
    index: [8, 0]
    walkable: true
  '34 34 34':
    index: [9, 0]
    walkable: true
  '35 35 35':
    index: [7, 1]
    walkable: true
  '36 36 36':
    index: [8, 1]
    walkable: true
  '37 37 37':
    index: [9, 1]
    walkable: true
  '38 38 38':
    index: [7, 2]
    walkable: true
  '39 39 39':
    index: [8, 2]
    walkable: true
  '40 40 40':
    index: [9, 2]
    walkable: true
  '41 41 41':
    index: [4, 1]
    walkable: true
  '255 0 255':
    visible: false

# laod tiles and level data from an image
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
  getTileAtPixelPosition: (x, y) -> @getTileAt Math.floor(x / @width), \
                                               Math.floor(y / @height)

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
        ctx.drawImage @tileImage, tilePosX, tilePosY,
          @tileWidth, @tileHeight,
          drawX, drawY,
          @tileWidth, @tileHeight
