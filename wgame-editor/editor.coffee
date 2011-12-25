io = require 'socket.io'
express = require 'express'

app = express.createServer()
io = io.listen app

app.configure ->
  app.set('views', __dirname + '/views')
  app.set('view engine', 'jade')
  app.use(express.bodyParser())
  app.use(express.methodOverride())
  app.use(app.router)
  app.use(express.static(__dirname + '/public'))

app.listen '1234'
io.sockets.on 'connection', (socket) ->
    socket.emit 'news', {'somthing'}
    socket.on 'blub', (data) ->
        console.log "recieved data from client: "
        console.log data

console.log 'listening to port 1234'
