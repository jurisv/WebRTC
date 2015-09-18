Ext.define('WebRTC.store.Users', {
    extend: 'Ext.data.Store',
    alias: 'store.Users',
   // model: 'WebRTC.model.User',

    autoLoad: true,
    autoSync: true,

    data : [],

    proxy: {
        type: 'memory',
        reader: {
            type: 'json'
        }
    },

    constructor: function () {
        var me = this;
        me.callParent(arguments);

        me.firebaseRef =  new Firebase('https://senchartc.firebaseio.com/commons');
        me.firebaseRef.on("value", function(snap) {
            debugger;
            if (snap.val() === true) {
                me.data = snap.val();
            }
        });


       //me.firebaseRef.update({Test: 'This works'});

    }

});