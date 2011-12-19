#                    This file is part of WGame.
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

# Keyboard Codes Definition
keyDefinition =
  38: 'KEY_UP'
  40: 'KEY_DOWN'
  39: 'KEY_RIGHT'
  37: 'KEY_LEFT'
  87: 'KEY_W'
  83: 'KEY_S'
  68: 'KEY_A'
  65: 'KEY_D'

# Action to function mapping
actionFunctionTable =
  startGoNorth: ->
  startGoSouth: ->
  startGoEast: ->
  startGoWest: ->

# KeyboardMappingTable
keydownActionTable =
  KEY_UP: 'startGoNorth'
  KEY_DOWN: 'startGoSouth'
  KEY_RIGHT: 'startGoEast'
  KEY_LEFT: 'startGoWest'
  KEY_W: 'startGoNorth'
  KEY_S: 'startGoSouth'
  KEY_D: 'startGoEast'
  KEY_A: 'startGoWest'
keyupActionTable =
  KEY_UP: 'stopGoNorth'
  KEY_DOWN: 'stopGoSouth'
  KEY_RIGHT: 'stopGoEast'
  KEY_LEFT: 'stopGoWest'
  KEY_W: 'stopGoNorth'
  KEY_S: 'stopGoSouth'
  KEY_D: 'stopGoEast'
  KEY_A: 'stopGoWest'

### action helper functions ###
# Get Action name for keypress or release
getActionNameForKeyDown = (key) -> keydownActionTable[keyDefinition[key]]
getActionNameForKeyUp = (key) -> keyupActionTable[keyDefinition[key]]

# Get function  for keypress or release
getActionForKeyDown = (key) -> actionFunctionTable[keydownActionTable[keyDefinition[key]]]
getActionForKeyUp = (key) -> actionFunctionTable[keyupActionTable[keyDefinition[key]]]

# Do Action for keypress or release
doActionForKeyDown = (key) -> getActionForKeyDown(key)?()
doActionForKeyUp = (key) -> getActionForKeyUp(key)?()

# Assign an Action
setAction = (action, func) -> actionFunctionTable[action] = func
