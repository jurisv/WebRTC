/**
 * @class WebRTC.model.AdminSettings
 * @extend Ext.data.Model
 * Model for the server settings that are editable at the client.
 */
Ext.define('WebRTC.model.AdminSettings', {
    extend: 'Ext.data.Model',
    
    requires: [
        'Ext.data.proxy.Rest'
    ],

    idProperty: 'id',

    fields: [
        'id',
        { name: 'otApiKey',     mapping: 'serviceprovider.opentok.ApiKey'},
        { name: 'otSecretKey',  mapping: 'serviceprovider.opentok.SecretKey'},
        { name: 'fbApiKey',     mapping: 'serviceprovider.firebase.ApiKey'},
        { name: 'fbSecretKey',  mapping: 'serviceprovider.firebase.SecretKey'},
        { name: 'fbUrl',        mapping: 'serviceprovider.firebase.Url'}
    ],

    proxy: {
        type: 'rest',
        url : '/config',
        reader: {
            type: 'json',
            rootProperty: 'data'
        },
        writer:{
            type: 'json',
            writeAllFields: true,
            expandData: true,
            nameProperty: 'mapping'
        }
    }
});
