(function() {
  var app, express, io;

  io = require('socket.io');

  express = require('express');

  app = express.createServer();

  io = io.listen(app);

  app.configure(function() {
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    return app.use(express.static(__dirname + '/public'));
  });

  app.listen('1234');

  io.sockets.on('connection', function(socket) {
    socket.emit('news', {
      'somthing': 'somthing'
    });
    return socket.on('blub', function(data) {
      console.log("recieved data from client: ");
      return console.log(data);
    });
  });

  console.log('listening to port 1234');

}).call(this);
