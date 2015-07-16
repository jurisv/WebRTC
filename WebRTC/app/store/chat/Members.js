Ext.define('WebRTC.store.chat.Members', {
    extend: 'Ext.data.Store',
    alias: 'store.members',
    model:'WebRTC.model.chat.RoomMember',
    autoLoad: true,
    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            rootProperty: 'items'
        }
    }
});
