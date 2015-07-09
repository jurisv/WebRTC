/**
 * @class WebRTC.model.File
 * @extend Ext.data.Model
 * Model which contains all the informations
 * related to a single Google Drive File.
 */
Ext.define('WebRTC.model.File', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            { name: 'id',              type: 'string' },
            { name: 'title',           type: 'string' },
            { name: 'webContentLink',  type: 'string' }
        ]
    }
});