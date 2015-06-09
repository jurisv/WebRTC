//Set up common namespace for the application
//As this is the global namespace, it will be available across all modules
if(!global.App){
    global.App = {};
}

var path = require('path'),
    express = require('express'),               //The web routing engine and framework
    nconf = require('nconf'),                   // node config Key/Value pairs
    fs = require('fs'),                         //file system
    moment = require('moment'),                 //moment is a friendly time library
    bodyparser = require('body-parser'),        // used for POST and QueryString Parsing
    ejs = require('ejs'),                       //ejs is a template engine for JSON to HTML
    data = require('./lib/data'),               //resource based lookups
    ServerConfig, ExtDirectConfig,              //variables for later use
    environment, port, protocol,
    store, pub_path;

var app = module.exports = require('express')(); //Setup express app
var http = require('http').Server(app);
var io = require('socket.io')(http);

nconf.env().file({file: path.join(__dirname, 'server-config.json')});
environment = global.App.mode = process.env.NODE_ENV || 'development';
ServerConfig = nconf.get("ServerConfig-" + environment);

// GLOBAL: make the express app global
global.App = app;

var OpenTok = require('opentok');               //OpenTok WebTRC service calls  http://www.tokbox.com

// Verify that the API Key and API Secret are defined
var otApiKey = ServerConfig.otAPIKEY,
    otApiSecret = ServerConfig.otAPISECRET;
if (!otApiKey || !otApiSecret) {
  console.log('You must specify API_KEY and API_SECRET environment variables');
  process.exit(1);
}

// GLOBAL: Initialize OpenTok authenticated instance
opentok = new OpenTok(otApiKey, otApiSecret);


// Create a session and store it in the express app
// This will be the global room for this server
opentok.createSession(function(err, session) {
  if (err) throw err;
  app.set('sessionId', session.sessionId);

  // We will wait on starting the app until this is done
  initServer();
});

// simple logger placing first and using next()
// allows this to run as well as other matching methods.
if(ServerConfig.logAllCalls) {
    app.use(function (req, res, next) {
        console.log('%s %s', req.method, req.url);
        // logger.info('%s %s', req.method, req.url);
        next();
    });
}

app.set('port', ServerConfig.port | 8000);
app.set('protocol', ServerConfig.protocol || 'http');
app.use(bodyparser());

port = app.get('port');
protocol = app.get('protocol');
pub_path = path.join(__dirname, ServerConfig.webRoot);

if(ServerConfig.enableCompression){
   var compress = require('compression');
   app.use(compress());
}

app.use(express.static(path.join(__dirname, ServerConfig.webRoot)));
app.use(express.static('Overrides', __dirname + '../admin/overrides/' ));
app.use(express.static('Ext6','/Users/brad/Sencha/SDK/ext-6.0.0/' ));


//Route all data related calls as a single route
app.route('/data/:store')
  .get(function(req, res) {
    var store = 'GET_'+ req.params.store;
    data[store](req,res);
  })
  .post(function(req, res) {
    var store = 'POST_'+ req.params.store;
    data[store](req,res);
  })
  .put(function(req, res) {
    var store = 'PUT_'+ req.params.store;
    data[store](req,res);
  });

//CORS Supports
if(ServerConfig.enableCORS){

    app.use( function(req, res, next) {
        res.header('Access-Control-Allow-Origin', ServerConfig.AccessControlAllowOrigin); // allowed hosts
        res.header('Access-Control-Allow-Methods', ServerConfig.AccessControlAllowMethods); // what methods should be allowed
        res.header('Access-Control-Allow-Headers', ServerConfig.AccessControlAllowHeaders); //specify headers
        res.header('Access-Control-Allow-Credentials', ServerConfig.AccessControlAllowCredentials); //include cookies as part of the request if set to true
        res.header('Access-Control-Max-Age', ServerConfig.AccessControlMaxAge); //prevents from requesting OPTIONS with every server-side call (value in seconds)

        if (req.method === 'OPTIONS') {
            res.send(204);
        }
        else {
            next();
        }
    });
}

// middleware with an arity of 4 are considered
// error handling middleware. When you next(err)
// it will be passed through the defined middleware
// in order, but ONLY those with an arity of 4, ignoring
// regular middleware.
app.use(function(err, req, res, next){
  // whatever you want here, feel free to populate
  // properties on `err` to treat it differently in here.
  res.status(err.status || 500).send({ error: err.message });
});

//LAST
// our custom JSON 404 middleware. Since it's placed last
// it will be the last middleware called, if all others
// invoke next() and do not respond.

app.use(function(req, res){
 var template = fs.readFileSync(__dirname + '/views/404.html', 'utf8');
 var body = ejs.render(template, {
        filename: __dirname + '/views/404.html',
        title: 'Not Found'
  });
  res.status(404).send(body) ;
});





// Starts server listening and called by opentok after it's ready
function initServer(){
    http.listen(port);
}

io.on('connection', function(socket){
  console.log('a user connected');

  socket.broadcast.emit('hi');

  io.emit('chat message', 'connected!');

  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });

});

