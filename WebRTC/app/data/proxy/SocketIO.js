Ext.define ('WebRTC.data.proxy.SocketIO', {
    extend: 'Ext.data.proxy.Proxy' ,
    alias: 'proxy.socketio' ,
    config: {
        url:'',
        api: {
            all: 'all',
            create: 'create' ,
            read: 'read' ,
            update: 'update' ,
            destroy: 'destroy'
        }
    },

    constructor: function(config){
        var me = this;

        me.initConfig (config);
        me.callParent(arguments);

        //this is a namespaced socket that mimics api methods
        me.socket = io.connect(me.url);

        //use api to to listen
        Ext.Object.each(me.__proto__.config.api, function(key, value){
            console.log('adding '+ key +' listener on ' + value);
            me.socket.on (value, function (data) {
               var myKey = key;
               me.doListenApi (myKey, data);
            });
        });

        //use api to to emit
        Ext.Object.each(me.__proto__.config.api, function(key, value){
            console.log('adding '+ key +' emitter on ' + value);
            var myKey = key,
                myValue = value;
            me[value] = function ( operation, callback, scope) {
               var key = myKey,
                   value = myValue;
               me.doEmitApi (key, operation, callback, scope, value);
            };
        });

        return me;

    },

    doListenApi: function (key, data){
        console.log('heard key of  '+ key +' data ' + data );

        switch (key){
            case 'read':
                break;
            case 'update':
                break;
            case 'delete':
                break;
            case 'create':
                break;
            case 'all':
                this.fireEvent('roomschanged',data);
                break;
        }

    },

    doEmitApi: function (key, operation, callback, scope, value){
       console.log('emitting key of  '+ key );
       this.socket.emit(key, value);
    }


});

