io = require 'socket.io'
express = require 'express'

app = express.createServer()

app.configure ->
  app.set('views', __dirname + '/views')
  app.set('view engine', 'jade')
  app.use(express.bodyParser())
  app.use(express.methodOverride())
  app.use(app.router)
  app.use(express.static(__dirname + '/public'))


app.get '/', (req, res) ->
    res.send 'hello world'
    console.log 'got request'

app.listen '1234'
console.log 'listening to port 1234'
