/**
 * @class WebRTC.model.AdminSettings
 * @extend Ext.data.Model
 * Model for the server settings that are editable at the client.
 */
Ext.define('WebRTC.model.AdminSettings', {
    extend: 'Ext.data.Model',
    requires: ['Ext.data.proxy.Rest'],
    idProperty: 'id',
    // identifier: 'uuid', //creates a uuid and assisgns it to the id field
    fields: [
        { name: 'id',    type: 'string' },
//        { name: 'serviceprovider' }
        { name: 'otApiKey',    type: 'string'}, // ,mapping: 'data.serviceprovider.opentok.SecretKey'     }
        { name: 'otSecretKey',  type: 'string'}, // , mapping: function(data) {  return data.serviceprovider.opentok.SecretKey; }   },
        { name: 'fbApiKey',  type: 'string'}, // , mapping: function(data) {  return data.serviceprovider.firebase.ApiKey; }   },
        { name: 'fbSecretKey',  type: 'string'}, // , mapping: function(data) {  return data.serviceprovider.firebase.SecretKey; }  },
        { name: 'fbUrl',  type: 'string'} // , mapping: function(data) {  return data.serviceprovider.firebase.Url; } }
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
            writeAllFields: true
        }
    }
});