#           This file is part of WGame.
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

# Defines drawing position
class wg.Camera
  constructor: (@x = 0, @y = 0) ->


# Stores the level
class wg.Level
  constructor: (@width, @height, @camera = new wg.Camera()) ->
    @layers = new Array()
    @tiles = new Array()
  addLayer: (layer) ->
    @layers.push layer
  draw: -> layer.draw @camera for layer in @layers


# Abstract class for a drawing layer
class wg.LevelLayer
  constructor: (@level)
  draw: (camera) ->


# Just displays a static image
class wg.BackgroundImageLayer extends wg.LevelLayer
  constructor: (@image, @relativeSpeed = 1, @animationSpeed = 33) ->
    @images = new Array()
    @images.push @image
    @tick = 0
    @animationIndex = 0
  draw: (camera) ->
    @animation()
    originPosX = -((camera.x * @relativeSpeed + @image.width * 100) % @image.width)
    originPosY = -((camera.y * @relativeSpeed + @image.height * 100) % @image.height)
    rightBorder = originPosX + @image.width
    bottomBorder = originPosY + @image.height
    wg.ctx.drawImage @image, originPosX, originPosY
    if rightBorder <= wg.canvas.width
      wg.ctx.drawImage @image, rightBorder, originPosY
    if bottomBorder <= wg.canvas.height
      wg.ctx.drawImage @image, originPosX, bottomBorder
    if rightBorder <= wg.canvas.width and bottomBorder <= wg.canvas.height
      wg.ctx.drawImage @image, rightBorder, bottomBorder
  animation: ->
    @tick++;
    if @tick > @animationSpeed
      @tick = 0
      @animationIndex = (@animationIndex + 1) % @images.length
      @image = @images[@animationIndex]
  addImage: (image) ->
    @images.push image

