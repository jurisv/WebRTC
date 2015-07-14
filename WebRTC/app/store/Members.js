Ext.define('WebRTC.store.Members', {
    extend: 'Ext.data.Store',
    alias: 'store.members',
    model:'WebRTC.model.RoomMember',
    autoLoad: true,
    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            rootProperty: 'items'
        }
    }
});
