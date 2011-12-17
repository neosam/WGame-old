class Sprite
  constructor: (@image, @width, @height) ->
    @position = [0, 0]
    @innerPos = [0, 0]
  draw: (camera) ->
    ctx.drawImage @image, @innerPos[0] * @width, @innerPos[1] * @height, \
                          @width, @height, \
                          @position[0] - camera.x, @position[1] - camera.y, \
                          @width, @height



class SpriteLayer extends LevelLayer
   constructor: ->
     @sprites = new Array()
   addSprite: (sprite) ->
     @sprites.push sprite
   draw: (camera) ->
     for sprite in @sprites
        sprite.draw camera
