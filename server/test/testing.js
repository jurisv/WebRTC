var fs = require('fs');

module.exports = {
    config: {},      // file goes here
    ExtComponentLoc: '',

    clickExt: function(){
        var me = this,
            query = arguments[0],
            callback = arguments[arguments.length - 1];

       this.getExtObjId(query, function(err, result) {
            me.click(result)
        })
    },

    getExtObjId: function(){
        var query = arguments[0],
            callback = arguments[arguments.length - 1];

        //run in the browser
        this
        .execute(
            "return Ext.ComponentQuery.query('" + query +  "')[0].id",
            function(err,resp){
               if(!err){
                    console.log('Found Component : ' + resp.value);
                    var ExtComponentLoc = '*[id=' + resp.value + ']';
                    callback(undefined,ExtComponentLoc);
               }
        })
    },

    getCapabilties: function(){
        if(module.exports.config.browser){
            return module.exports.config.browser
        }else{
            return 'chrome'
        }
    },

    init : function(callback){
        fs.readFile(__dirname + '/config_local.json', 'utf8', function (err, data) {
          if (err) {
              fs.readFile(__dirname + '/config.json', 'utf8', function (err, data) {
              if (err) {
                console.log(err);
                return;
              }
              module.exports.config = JSON.parse(data);
              callback();
            });
          }else{
              module.exports.config = JSON.parse(data);
              callback();
          }
        });
    }

};
