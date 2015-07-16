Ext.define('WebRTC.model.chat.RoomMember', {
    extend: 'Ext.data.Model',
    config:{
        fields: [
            'id',
            'name',
            'isBroadcasting',
            'email',
            'phone'
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