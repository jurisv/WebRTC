Ext.define('WebRTC.model.RoomMember', {
    extend: 'Ext.data.Model',
    fields: [ 'id','name', 'isBroadcasting', 'email', 'phone'],
    proxy: {
       // url : '/data/roommembers'
    },
    reader: {
        type: 'json', // This is the default
        rootProperty: 'data'
    }
});