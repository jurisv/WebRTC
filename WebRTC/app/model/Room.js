Ext.define('WebRTC.model.Room', {
    extend: 'Ext.data.TreeModel',
    proxy: {
        url : '/data/rooms'
    }
});