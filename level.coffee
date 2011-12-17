# Defines drawing position
class Camera
  constructor: (@x = 0, @y = 0) ->


# Stores the level
class Level
  constructor: (@width, @height, @camera = new Camera()) ->
    @layers = new Array()
    @tiles = new Array()
  addLayer: (layer) ->
    @layers.push layer
  draw: -> layer.draw @camera for layer in @layers


# Abstract class for a drawing layer
class LevelLayer
  constructor: (@level)
  draw: (camera) ->


# Just displays a static image
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


