wg ?= []
wg.editor ?= []
wg.editor.selectionX = 0
wg.editor.selectionY = 0
wg.editor.action = 0

$(document).ready ->
    wg.canvas = document.getElementById 'editorfield'
    if not wg.canvas.getContext
        alert 'Can not initialize canvas please use firefox, chrome or opera'
        return
    wg.ctx = wg.canvas.getContext '2d'
    wg.level = new wg.Level 0, 0
    window.setInterval 'wg.draw()', 33
    $('#tiles').click (event) ->
      wg.editor.selectionX = Math.floor event.offsetX / 32
      wg.editor.selectionY = Math.floor event.offsetY / 32
      console.log "Selected item: #{wg.editor.selectionX}/#{wg.editor.selectionY}"
    $(wg.canvas).click (event) ->
      switch wg.editor.action
        when 1
          x = event.offsetX + wg.level.camera.x
          y = event.offsetY + wg.level.camera.y
          console.log "Insert item at: #{x}/#{y}"
          tile = wg.editor.tiles.getTileAtPixelPosition(x, y)
          tile.index = [wg.editor.selectionX, wg.editor.selectionY]
          tile.visible = yes
    $(window).keydown (event) ->
       wg.doActionForKeyDown event.which
    wg.actionFunctionTable['startGoNorth'] = ->
      wg.level.camera.y += 32
    wg.actionFunctionTable['startGoSouth'] = ->
      wg.level.camera.y -= 32
    wg.actionFunctionTable['startGoWest'] = ->
      wg.level.camera.x += 32
    wg.actionFunctionTable['startGoEast'] = ->
      wg.level.camera.x -= 32


wg.editor.actionAddBackgroundLayer = ->
  layers = document.getElementById 'layers'
  name = $('[name="addBGName"]')[0].value
  imagePath = $('[name="addBGPath"]')[0].value
  relativeSpeed = parseFloat $('[name="addBGRel"]')[0].value
  animationSpeed = parseInt $('[name="addBGSpeed"]')[0].value
  image = new Image()
  image.src = imagePath
  layer = new wg.BackgroundImageLayer image, relativeSpeed, animationSpeed
  wg.level.addLayer layer
  layers.options.add new Option name, "#{layers.options.length}"
  $('#addBackgroundLayer').hide()

wg.editor.actionAddTileLayer = ->
  layers = document.getElementById 'layers'
  name = $('[name="addTileName"]')[0].value
  width = parseInt $('[name="addTileWidth"]')[0].value
  height = parseInt $('[name="addTileHeight"]')[0].value
  image = document.getElementById 'tiles'
  wg.editor.tiles = new wg.Tiles width, height
  layer = new wg.TileLayer 32, 32, image, wg.editor.tiles
  wg.level.addLayer layer
  layers.options.add new Option name, "#{layers.options.length}"
  $('#addTileLayer').hide()

wg.editor.actionAddSpriteLayer = ->
  layers = document.getElementById 'layers'
  name = $('[name="addTileName"]')[0].value
  image = document.getElementById 'tiles'
  layer = new wg.SpriteLayer
  wg.level.addLayer layer
  layers.options.add new Option name, "#{layers.options.length}"
  $('#addSpriteLayer').hide()

