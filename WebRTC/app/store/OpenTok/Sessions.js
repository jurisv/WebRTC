Ext.define('WebRTC.store.opentok.Sessions', {
    extend: 'Ext.data.Store',
    alias: 'store.opentokSessions',
    model:'WebRTC.model.opentok.Session',
    autoLoad: true,
    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            rootProperty: 'items'
        }
    }
});
