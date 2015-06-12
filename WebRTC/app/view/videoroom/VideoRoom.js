Ext.define('WebRTC.view.videoroom.VideoRoom', {
    extend: 'Ext.form.Panel',
    requires: [
        'WebRTC.view.videoroom.VideoModel',
        'WebRTC.view.videoroom.VideoController'
    ],
    xtype: 'videoroom',
    layout: 'border',

    controller: 'videoroom',
    viewModel: 'videoroom',
    items: []
});