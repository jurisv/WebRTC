Ext.define('WebRTC.store.Messages', {
    extend: 'Ext.data.Store',
    alias: 'store.messages',
    fields: [
        { name: 'id', type: 'string'},
        { name: 'message', type: 'string'},
        { name: 'time', type: 'date', dateformat: 'g:i A'},
        { name: 'from', type: 'string'}
    ],
    data: { items: [] },
    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            rootProperty: 'items'
        }
    }
});
