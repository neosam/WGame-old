wg ?= []

$(document).load ->
  wg.canvas = document.getElementById 'gamefield'
  if (!wg.canvas.getContext)
    alert 'Could not initialize canvas.  Please download a real browser'
    return

  wg.ctx = wg.canvas.getContext '2d'
  wg.level = new wg.Level 0, 0
  wg.calculation = wg.loadSequence testSequence, ->
    wg.prepareLevel()
  window.setInterval 'wg.draw()', 33

