Ext.define('WebRTC.store.Messages', {
    extend: 'Ext.data.Store',

    alias: 'store.messages',

    fields: [
        'message', 'time', 'user'
    ],

    data: {
        items: [
            { message: 'Enter your message below' }
        ]
    },
    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            rootProperty: 'items'
        }
    }
});
