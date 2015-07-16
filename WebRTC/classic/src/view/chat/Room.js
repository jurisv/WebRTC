Ext.define('WebRTC.view.chat.Room', {
    extend: 'Ext.Panel',
    xtype: 'chatroom',

    layout: {
        type: 'box',
        vertical: false,
        align: 'stretch'
    },

    controller: 'chatroom',

    viewModel : {
        data: {
            inCall: false,
            useMic: true,
            useCamera: true,
            room: {
                type: 'WebRTC.model.chat.Room',
                create: true
            }
        },
        // todo: remove messages and members and place as associated data stores of the room model.
        stores:{
            messages: {
                model:'WebRTC.model.chat.Message',
                storeId: 'roomMessages',
                autoLoad: true
            },
            members: {
                model:'WebRTC.model.chat.RoomMember',
                storeId: 'roomMembers',
                autoLoad: true
            }
        }
    },

    bind : {
        title : '{room.name}'
    },

    items: [
        {
            bodyPadding: 25,
            flex:2,
            layout: {
              type: 'vbox',
              align: 'stretch'
            },
            items: [
            {
                xtype: 'chatinfo'
            },{
                xtype: 'chathistory',
                reference: 'chathistory',
                flex: 3
            }]
        },{
            hidden: false,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            flex:1,
            items:[{
                bodyPadding: 20,
                items:{
                    // html: '<div style="text-align:center;"><img src="/resources/images/BlankAvatar.png" style="height:250px;" /><br></div>',
                    style: 'display: block; background-color:#eeeeee; background-image: url(https://static.opentok.com/webrtc/v2.6.0/images/rtc/audioonly-silhouette.svg); background-position: center bottom; background-repeat: no-repeat; background-size: auto 76%;',
                    xtype:'container',
                    layout:'fit',
                    minHeight: 200,
                    reference: 'you'
                },

                bbar:[{
                    iconCls: 'x-fa fa-phone',
                    bind:{
                        disabled: '{inCall}'
                    },
                    listeners: {
                        click: 'onCallRoom'
                    }
                },{
                    iconCls: 'x-fa fa-stop',
                    bind:{
                        disabled: '{!inCall}'
                    },
                    listeners: {
                        click: 'onEndCall'
                    }
                },'->',
                {
                    iconCls: 'x-fa fa-video-camera',
                    bind:{
                        disabled: '{!inCall}'
                    },
                    listeners: {
                        click: 'onPublishVideoToggle'
                    }
                },{
                    iconCls: 'x-fa fa-microphone',
                    bind:{
                        disabled: '{!inCall}'
                    },
                    listeners: {
                        click: 'onPublishAudioToggle'
                    }
                }
                ]
            },{
                title: 'Members',
                collapsable: true,
                xtype: 'chatmembers',
                iconCls: 'x-fa fa-group fa-lg',
                flex: 1
            },{
                title: 'Videos',
                iconCls: 'x-fa fa-video-camera fa-lg',
                xtype: 'chatvideowall',
                flex: 1
            },{
                title: 'Files',
                hidden: true,
                reference: 'chatfiles',
                // xtype: 'chatattachments',
                iconCls: 'x-fa fa-paperclip',
                flex: 1
            }]
        }
    ]



});