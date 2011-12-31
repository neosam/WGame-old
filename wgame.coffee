#        This file is part of WGame.
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

wg.canvas=0
wg.ctx=0
wg.level=0
wg.player=0

wg.movementX = 0
wg.movementY = 0

wg.draw = ->
  wg.calculation()
  wg.level.draw()

wg.calculation = ->
wg.finalPositions = []
wg.finalPositionAction = ->


wg.compareFinalPositions = (playerPos, finalPos) ->
        Math.floor(playerPos[0] / wg.player.width) == finalPos[0] and \
        Math.floor(playerPos[1] / wg.player.height) == finalPos[1]

wg.defaultLevelCalculation = ->
  wg.player.moveNorth() if wg.movementY < 0
  wg.player.moveSouth() if wg.movementY > 0
  wg.player.moveWest() if wg.movementX < 0
  wg.player.moveEast() if wg.movementX > 0
  wg.level.camera.x = wg.player.position[0] - (wg.canvas.width - wg.player.width) / 2
  wg.level.camera.y = wg.player.position[1] - (wg.canvas.height - wg.player.height) / 2
  for finalPosition in wg.finalPositions
    if wg.compareFinalPositions wg.player.position, finalPosition
      wg.finalPositionAction()
      return

wg.resetPlayerAnimation = ->
  if wg.movementY < 0
    wg.player.setAnimation 'goNorth'
  else if wg.movementY > 0
    wg.player.setAnimation 'goSouth'
  else if wg.movementX < 0
    wg.player.setAnimation 'goWest'
  else if wg.movementX > 0
    wg.player.setAnimation 'goEast'
  else
    wg.player.setAnimation 'default'


wg.prepareLevel = ->
  console.log 'prepare level 1'
  backgroundImage = new Image()
  backgroundImage.src = 'media/mysticalBG.png'
  backgroundImage2 = new Image()
  backgroundImage2.src = 'media/mysticalBG2.png'
  fgImage = new Image()
  fgImage.src = 'media/foreground.png'
  tilesImg = new Image()
  tilesImg.src = 'media/tiles.png'
  levelImg = new Image()
  wg.setAction 'startGoNorth', -> wg.movementY = -1; wg.resetPlayerAnimation()
  wg.setAction 'startGoSouth', -> wg.movementY = 1; wg.resetPlayerAnimation();
  wg.setAction 'startGoWest', -> wg.movementX = -1; wg.resetPlayerAnimation();
  wg.setAction 'startGoEast', -> wg.movementX = 1; wg.resetPlayerAnimation()
  wg.setAction 'stopGoNorth', -> wg.movementY = 0; wg.resetPlayerAnimation()
  wg.setAction 'stopGoSouth', -> wg.movementY = 0; wg.resetPlayerAnimation()
  wg.setAction 'stopGoWest', -> wg.movementX = 0; wg.resetPlayerAnimation()
  wg.setAction 'stopGoEast', -> wg.movementX = 0; wg.resetPlayerAnimation()
  levelImg.onload = ->
    loader = wg.loadTileFromImage levelImg
    tiles = loader.tiles
    bgLayer = new wg.BackgroundImageLayer backgroundImage, 1, 33
    bgLayer.addImage backgroundImage2
    fgLayer = new wg.BackgroundImageLayer fgImage, 5
    layer = new wg.TileLayer 32, 32, tilesImg, tiles
    spriteLayer = new wg.SpriteLayer()
    enemy = new wg.Enemy tilesImg, 32, 32, tiles
    enemy.innerPos = [0, 10]
    enemy.position = [64, 64]
    enemyDanceAnimation =
      speed: 11
      positions: [
        [1,11], [2, 11]
      ]
    enemyNorthAnimation =
      speed: 4
      positions: [
        [3,11], [4, 11]
      ]
    enemySouthAnimation =
      speed: 4
      positions: [
        [1,11], [2, 11]
      ]
    enemyWestAnimation =
      speed: 4
      positions: [
        [7,11], [8, 11]
      ]
    enemyEastAnimation =
      speed: 4
      positions: [
        [5,11], [6, 11]
      ]
    enemyDefaultAnimation =
      speed: 11
      positions: [[0, 11]]
    enemy.animations['dance'] = enemyDanceAnimation
    enemy.animations['goSouth'] = enemySouthAnimation
    enemy.animations['goNorth'] = enemyNorthAnimation
    enemy.animations['goWest'] = enemyWestAnimation
    enemy.animations['goEast'] = enemyEastAnimation
    enemy.animations['default'] = enemyDefaultAnimation
    player = new wg.Sprite tilesImg, 32, 32, tiles
    player.innerPos = [0, 10]
    player.position = [64, 64]
    playerDanceAnimation =
      speed: 11
      positions: [
        [1,10], [2, 10]
      ]
    playerNorthAnimation =
      speed: 4
      positions: [
        [3,10], [4, 10]
      ]
    playerSouthAnimation =
      speed: 4
      positions: [
        [1,10], [2, 10]
      ]
    playerWestAnimation =
      speed: 4
      positions: [
        [7,10], [8, 10]
      ]
    playerEastAnimation =
      speed: 4
      positions: [
        [5,10], [6, 10]
      ]
    player.animations['dance'] = playerDanceAnimation
    player.animations['goSouth'] = playerSouthAnimation
    player.animations['goNorth'] = playerNorthAnimation
    player.animations['goWest'] = playerWestAnimation
    player.animations['goEast'] = playerEastAnimation
    player.setAnimation 'dance'
    wg.player = player
    spriteLayer.addSprite player
    spriteLayer.addSprite enemy
    level = new wg.Level 32, 32
    level.addLayer bgLayer
    level.addLayer layer
    level.addLayer spriteLayer
    wg.level = level
    #level.addLayer fgLayer
    $(window).keydown (event) ->
      wg.doActionForKeyDown(event.which)
    $(window).keyup (event) ->
      wg.doActionForKeyUp(event.which)
    wg.calculation = wg.defaultLevelCalculation
    wg.finalPositionAction = ->
    wg.finalPositions = [[6, 25]]
  levelImg.src = 'media/level.png'

#$(document).ready ->
#  wg.canvas = document.getElementById 'gamefield'
#  if (!wg.canvas.getContext)
#    alert 'Could not initialize canvas.  Please download a real browser'
#    return
#
#
#  wg.ctx = wg.canvas.getContext '2d'
#  wg.level = new wg.Level 0, 0
#  wg.calculation = wg.loadSequence testSequence, ->
#    wg.prepareLevel()
#  window.setInterval 'wg.draw()', 33






