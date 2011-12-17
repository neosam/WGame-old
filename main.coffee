canvas=0
ctx=0

$(document).ready ->
  canvas = document.getElementById 'gamefield'
  if (!canvas.getContext)
    alert 'Could not initialize canvas'
    return

  ctx = canvas.getContext('2d')


