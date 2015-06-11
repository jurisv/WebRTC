Ext.define('WebRTC.store.Messages', {
    extend: 'Ext.data.Store',
    alias: 'store.messages',
    fields: [  'message', 'time', 'from'],
    data: { items: [] },
    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            rootProperty: 'items'
        }
    }
});
