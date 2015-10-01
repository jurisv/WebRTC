Ext.define('WebRTC.view.chat.VideoWall', {
    extend: 'Ext.Panel',
    xtype: 'chatvideowall',
    autoscroll: 'true',
    itemId: 'remotestreams',
    bodyStyle: 'background-color: #cacaca;',
    layout: {
        type: 'box',
        pack: 'center',
        align: 'stretch',
        vertical: true
    },

    items: [],
    tbar:[{
        // This is experimental to see if we can pop out video wall.
        text:'pop',
        hidden: true,
        handler:function(button){
            var me=this,
                strWindowFeatures = "width=600,height=600,menubar=no,location=no,resizable=yes,scrollbars=yes,status=no",
                win = window.open('', 'videoWall', strWindowFeatures);

            Ext.Function.defer(function(){
                   // win.document.open().write('<html><title>Video Wall</title><body></body></html>');
                   // win.document.close();
                    // debugger;
                    win.document.body.innerHTML = 'hi'
                },
                50);


        }
    }]
});