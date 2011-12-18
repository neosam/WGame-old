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
