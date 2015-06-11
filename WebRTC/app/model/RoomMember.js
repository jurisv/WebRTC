Ext.define('WebRTC.model.RoomMember', {
    extend: 'Ext.data.Model',
    fields: [ 'id','name', 'isBroadcasting', 'email', 'phone'],
    proxy: {
        type: 'memory',
        reader: {
            type: 'json'
        }
    }
});