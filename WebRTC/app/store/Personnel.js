Ext.define('WebRTC.store.Personnel', {
    extend: 'Ext.data.Store',

    alias: 'store.personnel',

    fields: [
        'id','name', 'isBroadcasting', 'email', 'phone'
    ],

    data: { items: []},

    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            rootProperty: 'items'
        }
    }
});
