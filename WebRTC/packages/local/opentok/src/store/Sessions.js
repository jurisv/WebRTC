Ext.define('opentok.store.Sessions', {
    extend: 'Ext.data.Store',
    alias: 'store.opentokSessions',
    model:'opentok.model.Session',
    autoLoad: true,
    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            rootProperty: 'items'
        }
    }
});
