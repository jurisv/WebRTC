Ext.define('WebRTC.model.RoomMessage', {
    extend: 'Ext.data.Model',
    proxy: {
        type: 'memory',
        reader: {
            type: 'json'
        }
    }
});