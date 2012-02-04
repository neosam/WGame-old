
if (typeof wg === "undefined" || wg === null) wg = [];

$(document).load(function() {
  wg.canvas = document.getElementById('gamefield');
  if (!wg.canvas.getContext) {
    alert('Could not initialize canvas.  Please download a real browser');
    return;
  }
  wg.ctx = wg.canvas.getContext('2d');
  wg.level = new wg.Level(0, 0);
  wg.Level.loadFromURL('level.js');
  wg.calculation = wg.loadSequence(testSequence, function() {
    return wg.prepareLevel();
  });
  return window.setInterval('wg.draw()', 33);
});
