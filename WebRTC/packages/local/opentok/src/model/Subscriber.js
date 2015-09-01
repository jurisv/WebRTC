Ext.define('opentok.model.Subscriber', {
    extend: 'Ext.data.Model',
    alias: 'opentokSubscriber',
    fields: [
        {name: 'id',  type: 'string'},
        {name: 'session_id', reference: 'Session' },
        {name: 'subscriber' }  //opentok object
    ],
    proxy: {
        type: 'memory',
        reader: {
            type: 'json'
        }
    }
});