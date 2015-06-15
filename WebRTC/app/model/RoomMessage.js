Ext.define('WebRTC.model.RoomMessage', {
    extend: 'Ext.data.Model',
    fields: [ 'id', 'message', 'time', 'from'],
    proxy: {
        type: 'memory',
        reader: {
            type: 'json'
        }
    }
});