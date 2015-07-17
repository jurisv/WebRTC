Ext.define ('WebRTC.data.proxy.SocketIO', {
    extend: 'Ext.data.proxy.Proxy' ,
    alias: 'proxy.socketio' ,
    config: {
        url:'',
        api: {
            create: 'create' ,
            read: 'read' ,
            update: 'update' ,
            destroy: 'destroy'
        }
    },
    
    constructor: function(config){
        var me = this;

        me.callParent(arguments);

    }
});
