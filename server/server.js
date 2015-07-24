//Set up common namespace for the application
//As this is the global namespace, it will be available across all modules
if(!global.App){
    global.App = {};
}

var fs = require('fs'),                         // file system
    path = require('path'),                     // path joining library
    bodyparser = require('body-parser'),        // used for POST and QueryString Parsing
    nconf = require('nconf'),                   // node config Key/Value pairs
    express = require('express'),               // The web routing engine and framework
    moment = require('moment'),                 // moment is a friendly time library
    ejs = require('ejs'),                       // ejs is a template engine for JSON to HTML

    ServerConfig, ExtDirectConfig,              // variables for later use
    environment, port, protocol,
    store, pub_path;

nconf.argv().env().file({file: path.join(__dirname, 'server-config.json')});   // path to config JSON
environment = global.App.mode = nconf.get("NODE_ENV") || 'production';   // default to production
ServerConfig = nconf.get("ServerConfig-" + environment);                // load server config JSON

var app = module.exports = require('express')();        // Setup express app

//to parse form body
app.use(bodyparser());


// GLOBAL: make the express app global
global.App = app;
global.App.config = nconf;     //all configs
global.App.ServerConfig = ServerConfig; //this config

var http = require('http').Server(app);                 // http on top of express for websocket handling
// var data = require('./lib/data')(app);                  // routes for data packages
var data = require('./lib/data/stores.js');             // routes for data packages
var io = require('./lib/sockets')(http);                // seperate module for all websocket requests


global.App.io = io;

//common function to standardize JSON to Ext.
global.App.wrapresponse = function  (data){
    var response = [].concat(data);
    return {
        "success": true,
        "message": "Successful",
        "total": response.length,
        "timestamp": new Date(),
        "data" : response
    }
};

// simple logger placing first and using next()
// allows this to run as well as other matching methods.
if(ServerConfig.logAllCalls) {
    app.use(function (req, res, next) {
        console.log('%s %s', req.method, req.url);
        // logger.info('%s %s', req.method, req.url);
        next();
    });
}

//port and protocol settings
app.set('port', ServerConfig.port | 8000);
app.set('protocol', ServerConfig.protocol || 'http');
port = app.get('port');
protocol = app.get('protocol');
pub_path = path.join(__dirname, ServerConfig.webRoot);

//server side compression of assets
if(ServerConfig.enableCompression){
   var compress = require('compression');
   app.use(compress());
}

//static routes for files using webRoot based on production or development environments
app.use(express.static(path.join(__dirname, ServerConfig.webRoot)));


//Route all data related calls as a single route with an id or not
app.route('/data/:store/:id')
    .get(function(req, res, id) {
        var store = 'get'+ req.params.store;
        data[store](req,res, req.params.id);
    })
    .post(function(req, res, id) {
        var store = 'add'+ req.params.store;
        data[store](req,res, req.params.id);
    })
    .put(function(req, res, id) {
        var store = 'set'+ req.params.store;
        data[store](req,res, req.params.id);
    });

app.route('/data/:store')
    .get(function(req, res) {
        var store = 'get'+ req.params.store;
        data[store](req,res);
    })
    .post(function(req, res) {
        var store = 'add'+ req.params.store;
        data[store](req,res);
    })
    .put(function(req, res) {
        var store = 'set'+ req.params.store;
        data[store](req,res);
    });

//There's only one config but the REST UI sends an id so just ignore it.
app.route('/config/:id')
    .get(function(req, res) {
        var config = global.App.config.get('adminsettings'),
            data;

        //Get only sends public data
        data=config;

        res.status(200).send(data);
    })
    .post(function(req, res) {
        var data = JSON.parse(req.body.data),
            config = global.App.config.get('adminsettings');
        if(!config.serviceprovider.firebase.Url && data){
            global.App.config.set('adminsettings:serviceprovider:firebase:Url', data).save();
        }
        res.status(200).send(data);
    })
    .put(function(req, res) {
        var store = 'set'+ req.params.store;
        data[store](req,res);
    });


//Development routes to include packages, override, and Ext Library
if(process.env.NODE_ENV == 'development'){
    app.use(express.static('Overrides', __dirname + '../admin/overrides/' ));
    app.use(express.static('Ext6', __dirname + '../WebRTC/ext/' ));
}





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





http.listen(port);