var express = require('express')
  , io = require('socket.io');

var app = express.createServer();

app.get('/', function(req, res){
    res.send('Hello World');
});

app.listen(36687);

var socket = io.listen(app);
socket.on('connection', function(client) {
    client.on('message', function() {});
    client.on('disconnect', function() {});
});