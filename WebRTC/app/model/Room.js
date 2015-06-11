Ext.define('WebRTC.model.Room', {
    extend: 'Ext.data.Model',
    proxy: {
        url : '/data/rooms'
    },
    reader: {
        type: 'json', // This is the default
        rootProperty: 'data'
    }
});