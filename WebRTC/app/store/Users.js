Ext.define('WebRTC.store.Users', {
    extend: 'Ext.data.Store',
    alias: 'store.Users',
    model: 'WebRTC.model.User',

    autoLoad: true,
    autoSync: true

});