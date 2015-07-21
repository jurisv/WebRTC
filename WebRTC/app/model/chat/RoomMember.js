Ext.define('WebRTC.model.chat.RoomMember', {
    extend: 'Ext.data.Model',
    config:{
        fields: [
            { name: 'user_id' /* , reference: 'user' */},
            { name: 'isBroadcasting', type: 'boolean', defaultValue: false},
            { name: 'name', type: 'string'  }
        ],
        hasMany:[
            { model: 'WebRTC.model.chat.Message', name: 'messages' }
        ]
    },
    proxy: {
        type: 'memory',
        reader: {
            type: 'json'
        }
    }
});