Ext.define('WebRTC.TokBoxVideo', {
    extend: 'Ext.Component',

// Todo: Make this extend from the video class
//  extend: 'WebRTC.Video',
    xtype: 'tokboxVideo',
    viewModel : {
        data: {
            video: {
                title :null,
                id: null,
                height: 200,
                width: 300,
                volume: .2,
                muted: false
            }
        }
    },
    bind : {
        data : '{video}'
    },
    tpl: [
//      '<video autoplay  id="{id}" height="{height}" width="{width}"></video>',
//      '<div class="title">{title}</div>',
        '<div id="{id}" height="400px" width="100%"></div>'

    ]
});