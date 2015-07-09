Ext.define('WebRTC.view.chat.ChatRoom', {
    extend: 'Ext.Panel',
    xtype: 'chatroom',
    layout: 'border',

    controller : 'chat',

    items: [{
        xtype: 'chatvideowall',
        flex: 1,
        region:'center'
    },{
        region:'east',
        width: '40%',
        hidden: false,
        split:true,
        // collapsible: true,
        // collasped:false,
        // title: 'Room Features',
        xtype: 'tabpanel',
        flex:1,
        items:[{
            title: 'Chat',
            xtype: 'chathistory',
            iconCls: 'x-fa fa-comments',
            flex: 1
        },{
            title: 'Files',
            iconCls: 'x-fa fa-paperclip',
            flex: 1
        },
            {
                title: 'Members',
                iconCls: 'x-fa fa-group',
                flex: 1
                // xtype: 'chatrooms'
            }]
    }]
});

/*
*
 */