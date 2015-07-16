Ext.define('WebRTC.view.chat.VideoWall', {
    extend: 'Ext.Panel',
    xtype: 'chatvideowall',

    requires: ['Ext.media.Video'],

    autoscroll: 'true',
    // bodyPadding: 20,
    itemId: 'remotestreams',
    layout: {
        type: 'box',
        vertical: false
    },

    items: []
});