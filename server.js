var fs = require('fs'),                         // file system
    bodyParser = require('body-parser'),        // used for POST and QueryString Parsing
    nconf = require('nconf'),                   // node config Key/Value pairs
    express = require('express'),               // The web routing engine and framework
    moment = require('moment'),                 // moment is a friendly time library
    ejs = require('ejs'),                       // ejs is a template engine for JSON to HTML
    wrap = require('./lib/wrapjsonresponse.js'),
    data,
    firebase,
    serverConfig;

if(process.env.NODE_ENV == 'production'){
    nconf.argv().env().file( __dirname + '/server-config.json');    // path to config JSON
}else{
    nconf.argv().env().file( __dirname + '/local-server-config.json');    // path to config JSON
}
serverConfig = nconf.get("ServerConfig");        // load environment config


var app = module.exports = require('express')();                      // Setup express app

//to parse form body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


if(nconf.get('adminsettings')['serviceprovider'] != undefined){

  data = require('./lib/data')(nconf);             // load data package for routes
}


// simple logger placing first and using next()
// allows this to run as well as other matching methods.
if(serverConfig.logAllCalls) {
    app.use(function (req, res, next) {
        console.log('%s %s', req.method, req.url);
        // logger.info('%s %s', req.method, req.url);
        next();
    });
}

//All browser crashes are logged to here.
app.route('/crashlog')
    .get(function(req, res, id) {
        res.status(200).send(null);
    });

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
    })
    .delete(function(req, res) {
        var store = 'delete'+ req.params.store;
        data[store](req,res);
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
    })
    .delete(function(req, res) {
        var store = 'delete'+ req.params.store;
        data[store](req,res);
    });

//There's only one config but the REST UI sends an id so just ignore it.
app.route('/config/:id')
    .get(function(req, res) {
        var config = nconf.get('adminsettings'),
            data;

        //Get only sends public data
        data=config;

        // For demo don't send live keys
        // todo: remove later
        data={
            "serviceprovider": {
            "opentok": {
                "otDefaultSessionId": "",
                "ApiKey": "yourkeyhere",
                "SecretKey": "yoursecrethere"
            },
            "firebase": {
                "Url": process.env.FirebaseUrl || config.serviceprovider.firebase.Url ,
                "ApiKey": "yourkeyhere",
                "SecretKey": "yoursecrethere"
            }
        }};

        res.status(200).send(wrap(data));
    })
    .post(function(req, res) {
        var data = req.body, // JSON.parse(req.body.data),
            config = nconf.get('adminsettings');
        if(!config.serviceprovider.firebase.Url && data){
            nconf.set('adminsettings', data);
            nconf.save();
        }
        res.status(200).send(wrap(data));
    })
    .put(function(req, res) {
        var data = req.body;

        //for demo don't save
        // app.config.set('adminsettings', data);
        // app.config.save();

        res.status(200).send(wrap(data));
    })
    .delete(function(req, res) {
        var data = JSON.parse(req.body.data);
        res.status(200).send(wrap(data));
    });

app.use(express.static( __dirname  + serverConfig.webRoot));

//server side compression of assets
if(serverConfig.enableCompression){
    var compress = require('compression');
    app.use(compress());
}


//CORS Supports
if(serverConfig.enableCORS){
    app.use( function(req, res, next) {
        res.header('Access-Control-Allow-Origin', serverConfig.AccessControlAllowOrigin); // allowed hosts
        res.header('Access-Control-Allow-Methods', serverConfig.AccessControlAllowMethods); // what methods should be allowed
        res.header('Access-Control-Allow-Headers', serverConfig.AccessControlAllowHeaders); //specify headers
        res.header('Access-Control-Allow-Credentials', serverConfig.AccessControlAllowCredentials); //include cookies as part of the request if set to true
        res.header('Access-Control-Max-Age', serverConfig.AccessControlMaxAge); //prevents from requesting OPTIONS with every server-side call (value in seconds)

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

var http = require('http').Server(app);                             // http on top of express for websocket handling
http.listen(process.env.PORT || serverConfig.port);

if(nconf.get('adminsettings')['serviceprovider'] != undefined){
    require('./lib/sockets')(http, nconf);          // seperate module for all websocket requests
}

