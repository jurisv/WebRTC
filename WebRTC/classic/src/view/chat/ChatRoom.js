Ext.define('WebRTC.view.chat.ChatRoom', {
    extend: 'Ext.Panel',
    xtype: 'chatroom',
    layout: 'border',

    controller : 'chatroom',

    viewModel : {
        data: {
            room: {
                type: 'WebRTC.model.Room',
                create: true
            }
        }
    },

    bind : {
        title : '{room.name}'
    },

    items: [
        {
            region:'center',
            bodyPadding: 25,
            layout: {
              type: 'vbox',
              align: 'stretch'
            },
            items: [{

                bind : {
                    data : '{room}'
                },
                tpl: [
                    '<div class="room-data">',
                    '<h1 class="room-title"><span class="x-fa fa-group"></span> {name}</h1>',
                    '<h4 class="room-description">{description}&nbsp;</h4>',
                    '</div>'
                ]
            },{
                xtype: 'chatvideowall',
                flex: 1
            }]
        },{
            region:'east',
            width: '30%',
            hidden: false,
            split:true,
            xtype: 'tabpanel',
            flex:1,
            items:[{
                title: 'Chat',
                xtype: 'chathistory',
                iconCls: 'x-fa fa-comments',
                flex: 1
            },{
                title: 'Members',
                xtype: 'chatmembers',
                iconCls: 'x-fa fa-group',
                flex: 1
            },{
                title: 'Files',
                // xtype: 'chatattachments',
                iconCls: 'x-fa fa-paperclip',
                flex: 1
            }]
        }
    ]

});