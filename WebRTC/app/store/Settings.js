Ext.define('WebRTC.store.Settings', {
    extend: 'Ext.data.Store',

    model: 'WebRTC.model.Config',

    autoLoad: true,
    autoSync: true,

    statics: {
        DEFAULTS: {
            'launchroom': null,
            'chat-sound': 'notification',
            'enter-sound': 'IncomingSignal011',
            'leave-sound': 'IncomingSignal012'
        }
    },


    proxy: {
        type: 'localstorage',
        id: 'connect-configs'
    },

    constructor: function () {
        var me = this;

        

        me.callParent(arguments);
        me.on('load', me.applyDefaultSettings, me);
    },

    applyDefaultSettings: function () {
        var me = this,
            defaults = me.statics().DEFAULTS,
            applied = false;

        Ext.Object.each(defaults, function(key, value){
            // console.log('checking default settings');
            var current = me.getById(key);
            if (!current) {
                // console.log('adding '+ key +' default setting');
                me.create({key: key, value: value});
                applied = true;
            }
        });

        if (applied) me.reload();
        

    }

});