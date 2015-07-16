Ext.define('WebRTC.view.chat.VideoWall', {
    extend: 'Ext.Panel',
    xtype: 'chatvideowall',

    requires: ['Ext.media.Video'],

    autoscroll: 'true',
    itemId: 'remotestreams',
    bodyStyle: 'background-color: #cacaca;',
    layout: {
        type: 'box',
        pack: 'center',
        align: 'middle',
        vertical: false
    },

    items: []
});