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
  draw: (camera) ->
     ctx.drawImage(@image, 0, 0)

/* Stores the level */
class Level
  constructor: (@width, @height, @camera = new Camera()) ->
    @layers = new Array()
    @tiles = new Array()
  addLayer: (layer) ->
    @layers.push layer
  draw: ->
    layer.draw @camera for layer in @layers

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
  layer = new StaticImageLayer image
  level = new Level 32, 32
  level.addLayer layer
  window.setInterval 'draw()', 33






