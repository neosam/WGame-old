#               This file is part of WGame.
#
#    Foobar is free software: you can redistribute it and/or modify
#    it under the terms of the Lesser GNU General Public License as published by
#    the Free Software Foundation, either version 3 of the License, or
#    (at your option) any later version.
#
#    Foobar is distributed in the hope that it will be useful,
#    but WITHOUT ANY WARRANTY; without even the implied warranty of
#    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#    Lesser GNU General Public License for more details.
#
#    You should have received a copy of the GNU General Public License
#    along with Foobar.  If not, see <http://www.gnu.org/licenses/>.
wg ?= new Object()

class wg.Sprite
  constructor: (@image, @width, @height, @tiles) ->
    @position = [0, 0]
    @innerPos = [0, 0]
    @animations =
      default:
        speed: 1
        positions: [
          [0,10]
        ]
    @setAnimation 'default'
  setAnimation: (animationName) ->
    if animationName == @animationName
      return
    @animationName = animationName
    @animation = @animations[animationName] ? @animations['default']
    @animationTick = @animation.speed
    @animationIndex = @animation.positions.length
  animate: ->
    @animationTick++
    if @animationTick >= @animation.speed
      @animationIndex = (@animationIndex + 1) % @animation.positions.length
      @innerPos = @animation.positions[@animationIndex]
      @animationTick = 0

  draw: (camera) ->
    @animate()
    wg.ctx.drawImage @image, @innerPos[0] * @width, @innerPos[1] * @height, \
                          @width, @height, \
                          @position[0] - camera.x, @position[1] - camera.y, \
                          @width, @height
  moveNorth: -> @moveTo @position[0], @position[1] - 4
  moveSouth: -> @moveTo @position[0], @position[1] + 4
  moveWest: -> @moveTo @position[0] - 4, @position[1]
  moveEast: -> @moveTo @position[0] + 4, @position[1]
  moveTo: (x, y) -> [@position[0], @position[1]] = [x, y] if @isFieldPossible x, y
  isFieldPossible: (x, y) ->
    @tiles.getTileAtPixelPosition(x, y).walkable \
          and @tiles.getTileAtPixelPosition(x + @width - 1, y).walkable \
          and @tiles.getTileAtPixelPosition(x, y + @height - 1).walkable \
          and @tiles.getTileAtPixelPosition(x + @width, y + @height - 1).walkable

class wg.Enemy extends wg.Sprite
  constructor: (image, width, height, tiles) ->
    super(image, width, height, tiles)
    @movement = 0 # 1 = north, 2 = south, 3 = west, 4 = east
    @activity = 0.03 # must be between 0 and 1 and definies how oft this one will change
                    # walking direction
  draw: (camera) ->
    @doAI() if Math.random() < @activity
    @move()
    super camera
  doAI: ->
    if @movement != 0
      @movement = 0
      @setAnimation 'dance'
    else
      @movement = Math.floor(Math.random() * 4 + 1)
      switch @movement
          when 1 then @setAnimation 'goNorth'
          when 2 then @setAnimation 'goSouth'
          when 3 then @setAnimation 'goEast'
          when 4 then @setAnimation 'goWest'
  move: ->
    switch @movement
      when 1 then @moveNorth()
      when 2 then @moveSouth()
      when 3 then @moveEast()
      when 4 then @moveWest()


class wg.SpriteLayer extends wg.LevelLayer
   constructor: ->
     @sprites = new Array()
   addSprite: (sprite) ->
     @sprites.push sprite
   draw: (camera) ->
     for sprite in @sprites
        sprite.draw camera
