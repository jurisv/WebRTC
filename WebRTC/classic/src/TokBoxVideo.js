Ext.define('WebRTC.TokBoxVideo', {
    extend: 'Ext.Component',

// Todo: Make this extend from the video class
//  extend: 'WebRTC.Video',
    xtype: 'tokboxVideo',
    layout: 'fit',
    viewModel : {
        data: {
            video: {
                title :'Max',
                height: 100,
                width: 100,
                volume: .2,
                muted: false
            }
        }
    },
    bind : {
        data : '{video}'
    },
    tpl: [
        '<video autoplay  id="mainVideo" height="{height}" width="{width}"></video>',
        '<div class="title">{title}</div>'
    ]
});