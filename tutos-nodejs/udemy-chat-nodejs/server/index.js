var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static('client'));

//Definir ruta.
app.get('/hola-mundo', function(req, res) {
  res.status(200).send('Ruta de hola mundo');
});

var messages = [{
  id: 1,
  text: 'maldito nodemon no funciona',
  nickname: 'Bot-El'
}];

//Conectar al socket.
io.on('connection', function(socket) {
  console.log('El nodo ' + socket.handshake.address + ' se ha conectado');

  socket.emit('messages', messages);

  socket.on('add-message', function(data) {
    messages.push(data);

    io.sockets.emit('messages', messages);
  });
});

server.listen(6677, function() {
  console.log('El servidor está funcionando en http://localhost:6677');
});
