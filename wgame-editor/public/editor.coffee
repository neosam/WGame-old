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
      x = event.offsetX + wg.level.camera.x
      y = event.offsetY + wg.level.camera.y
      console.log "Insert item at: #{x}/#{y}"
      switch wg.editor.action
        when 1
          walkable = $('#walkable')[0].checked
          tile = wg.editor.tiles.getTileAtPixelPosition(x, y)
          tile.index = [wg.editor.selectionX, wg.editor.selectionY]
          tile.visible = yes
          tile.walkable = walkable
        when 2
          tile = wg.editor.tiles.getTileAtPixelPosition(x, y)
          tile.visible = no
          tile.walkable = no

    $(window).keydown (event) ->
       wg.doActionForKeyDown event.which
    wg.actionFunctionTable['startGoNorth'] = ->
      wg.level.camera.y -= 32
    wg.actionFunctionTable['startGoSouth'] = ->
      wg.level.camera.y += 32
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
  layer.editorName = name
  layer.editorType = 'BackgroundLayer'
  layer.editorPaths = [imagePath]
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
  layer.editorName = name
  layer.editorType = 'TileLayer'
  wg.level.addLayer layer
  layers.options.add new Option name, "#{layers.options.length}"
  $('#addTileLayer').hide()

wg.editor.actionAddSpriteLayer = ->
  layers = document.getElementById 'layers'
  name = $('[name="addSpriteName"]')[0].value
  image = document.getElementById 'tiles'
  layer = new wg.SpriteLayer
  layer.editorName = name
  layer.editorType = 'SpriteLayer'
  wg.editor.spriteLayer = layer
  wg.level.addLayer layer
  layers.options.add new Option name, "#{layers.options.length}"
  $('#addSpriteLayer').hide()


wg.editor.generateCode = ->
  res =
    type: 'WGame Level'
    version: '0.1'
    tilesImage: 'media/tiles.png'
    tiles: wg.editor.tiles
    layers: []

  for layer in wg.level.layers
    insert =
      name: layer.editorName
      type: layer.editorType
    switch layer.editorType
      when 'BackgroundLayer'
        insert.animationSpeed = layer.animationSpeed
        insert.relativeSpeed = layer.relativeSpeed
        insert.imagePaths = layer.editorPaths
      when 'TileLayer'
        insert.width = layer.width
        insert.height = layer.height
    res.layers.push insert

  $('#levelOutput')[0].value = res.toJSONString()

wg.editor.importCode = ->
  layers = document.getElementById 'layers'
  layers.options.length = 0
  code = $('#levelOutput')[0].value
  data = code.parseJSON()
  console.log data
  document.getElementById('tiles').src = data.tilesImage
  tiles = data.tiles
  wg.level = new wg.Level 0, 0

  for layer in data.layers
    insert = null
    switch layer.type
      when 'BackgroundLayer'
        image = new Image()
        image.src = layer.imagePaths[0]
        insert = new wg.BackgroundImageLayer image, layer.relativeSpeed, layer.animationSpeed
        insert.editorPaths = layer.imagePaths
      when 'TileLayer'
        image = document.getElementById('tiles')
        wg.editor.tiles = new wg.Tiles data.tiles.width, data.tiles.height
        for i in [0...data.tiles.tiles.length]
          wg.editor.tiles.tiles[i].index = data.tiles.tiles[i].index
          wg.editor.tiles.tiles[i].visible = data.tiles.tiles[i].visible ? no
          wg.editor.tiles.tiles[i].walkable = data.tiles.tiles[i].walkable ? no
        insert = new wg.TileLayer 32, 32, image, wg.editor.tiles
      when 'SpriteLayer'
        insert = new wg.SpriteLayer()
        wg.editor.spriteLayer = insert
    insert.editorName = layer.name
    insert.editorType = layer.type
    wg.level.addLayer insert
    layers.options.add new Option layer.name, "#{layers.options.length}"


