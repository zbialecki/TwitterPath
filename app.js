var PORT = 36687;

var express = require('express')
  , io      = require('socket.io')
  , jqtpl   = require('jqtpl');

var app = express.createServer();

app.configure(function() {
	app.set("view engine", "html");
	app.register(".html", require("jqtpl"));
	app.use(express.bodyDecoder());
	app.use(express.methodOverride());
	app.use(express.staticProvider(__dirname + '/public'));
	app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.get('/', function(req, res){
    res.render('index.html', {
	    locals: { title: 'TwitterPath :: Explore Connections on Twitter' },
		layout: 'layout.html'
	});
});

app.listen(PORT);

var socket = io.listen(app);
socket.on('connection', function(client) {
    client.on('message', function() {});
    client.on('disconnect', function() {});
});