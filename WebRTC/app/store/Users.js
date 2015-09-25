Ext.define('WebRTC.store.Users', {
    extend: 'Ext.data.Store',
    alias: 'store.Users',
    model: 'WebRTC.model.User',
    proxy: {
        type: 'socketio',
        url : '/users',
        apiEvents: {
            read: 'child_added',
            update: 'child_changed',
            destroy: 'child_removed'
        },
        reader: {
            type: 'json',
            rootProperty: 'data'
        },
        writer: {
            type: 'json',
            writeAllFields: true
        }
    },
    autoLoad: true,
    autoSync: true

});