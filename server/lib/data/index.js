var data = {
    init: function (app) {
       var data = require('./stores.js');

        //Route all data related calls as a single route no id
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

        //Route all data related calls as a single route with id
        app.route('/data/:store/:id')
        .get(function(req, res, id) {
        var store = 'get'+ req.params.store;
        data[store](req,res, id);
        })
        .post(function(req, res, id) {
        var store = 'add'+ req.params.store;
        data[store](req,res, id);
        })
        .put(function(req, res, id) {
        var store = 'set'+ req.params.store;
        data[store](req,res, id);
        });

    }
};

module.exports = data;


