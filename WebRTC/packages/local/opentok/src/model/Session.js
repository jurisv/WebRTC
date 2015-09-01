Ext.define('opentok.model.Session', {
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
    },
    hasMany:[
        { model: 'opentok.model.Subscriber', name: 'subscribers' }
    ]
});