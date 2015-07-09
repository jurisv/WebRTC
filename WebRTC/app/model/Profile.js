/**
 * @class WebRTC.model.Profile
 * @extend Ext.data.Model
 * Generic Profile data model which is used inside the view which display
 * all the available profiles of any kind.
 */
Ext.define('WebRTC.model.Profile', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            { name: 'id',          type: 'string' },
            { name: 'type',        type: 'string' },    // PHONE or XMPP
            { name: 'displayName', type: 'string' }
        ]
    }
});