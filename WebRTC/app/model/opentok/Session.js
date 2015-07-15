Ext.define('WebRTC.model.opentok.Session', {
    extend: 'Ext.data.Model',
    alias: 'opentokSession',
    fields: [
        {name: 'id',  type: 'string'},
        {name: 'session'}
    ],
    proxy: {
        type: 'memory',
        reader: {
            type: 'json'
        }
    }
});