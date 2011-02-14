// Global Server Settings
var PORT = 36687;
var T    = require('./app/settings').T;

// Required Modules
var sys     = require('sys')
  , express = require('express')
  , io      = require('socket.io')
  , jqtpl   = require('jqtpl')
  , OAuth   = require('oauth').OAuth;

var oa = new OAuth('https://api.twitter.com/oauth/request_token',
                   'https://api.twitter.com/oauth/access_token',
                   T.CONSUMER_KEY,
                   T.CONSUMER_SECRET,
                   '1.0A',
                   'http://findjoey.webfactional.com',
                   'HMAC-SHA1');
                    
var app = express.createServer();

app.configure(function() {
    app.set("view engine", "html");
    app.register(".html", jqtpl);
    app.use(express.bodyDecoder());
    app.use(express.methodOverride());
    app.use(express.staticProvider(__dirname + '/public'));
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

// Routes
app.get('/', function(req, res) {
    res.render('index', {
        locals: { title: 'TwitterPath :: Explore Connections on Twitter' },
        layout: 'layout.html'
    });
    
    // oa.getOAuthRequestToken(function(error, oauth_token, oauth_token_secret, results) {
    //     if (error) {
    //         console.log('error :' + error);
    //     } else {
    //         console.log('oauth_token :' + oauth_token);
    //         console.log('oauth_token_secret :' + oauth_token_secret);
    //         console.log('requestoken results :' + sys.inspect(results));
    //         console.log('Requesting access token...');
    //         oa.getOAuthAccessToken(oauth_token, oauth_token_secret, function(error, oauth_access_token, oauth_access_token_secret, results2) {
    //             console.log('oauth_access_token :' + oauth_access_token);
    //             console.log('oauth_token_secret :' + oauth_access_token_secret);
    //             console.log('accesstoken results :' + sys.inspect(results2));
    // 				oa.get("http://api.twitter.com/1/statuses/retweeted_by_me.json", oauth_access_token, oauth_access_token_secret, function(error, data) {
    // 				    console.log(data);
    // 				});
    //         });
    //     }
    // });

	oa.get('http://api.twitter.com/1/statuses/retweeted_by_me.json', 
	       T.ACCESS_TOKEN, T.ACCESS_TOKEN_SECRET, function(error, data) {
	    console.log(data);
	});
});

app.listen(PORT);
console.log('Server is now listening on port ' + PORT + '\n');

var socket = io.listen(app);
socket.on('connection', function(client) {
    client.on('message', function(msg) { console.log(msg) });
    client.on('disconnect', function() {});
});
