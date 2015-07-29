Ext.define('WebRTC.store.Sounds', {
    extend: 'Ext.data.Store',

    autoLoad: true,
    fields: ['id', 'wav', 'mp3', 'ogg'],
    proxy: {
        type: 'ajax',
        url: '/resources/sounds.json',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }    
});
