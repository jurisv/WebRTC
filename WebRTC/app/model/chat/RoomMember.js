Ext.define('WebRTC.model.chat.RoomMember', {
    extend: 'Ext.data.Model',

    idProperty: 'id',
    requires: ['Ext.data.identifier.Uuid'],
    identifier: 'uuid', //creates a uuid and assisgns it to the id field

    fields: [
        'id',
        'roomid',
        'name',
        { name: 'user_id' /* , reference: 'user' */},
        { name: 'isBroadcasting', type: 'boolean', defaultValue: false}
    ],
    proxy: {
        // type: 'memory'
        type: 'socketio',
        url : '/roommembers',
        extraParams: {
            room: null
        },
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
    }
});