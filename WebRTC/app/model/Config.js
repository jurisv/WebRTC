/**
 * @class WebRTC.model.Config
 * @extend Ext.data.Model
 * Model which contains a key value pair
 * of the user or application configurations.
 */
Ext.define('WebRTC.model.Config', {
    extend: 'Ext.data.Model',
    
    idProperty: 'key',
    fields: [
        { name: 'key',    type: 'string' },
        { name: 'value',  type: 'string' }
    ]
});