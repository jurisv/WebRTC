Ext.define('WebRTC.view.chat.Room', {
    extend: 'Ext.Panel',
    xtype: 'chatroom',

    layout: {
        type: 'box',
        vertical: true,
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
                // storeId: 'roomMessages',
                autoLoad: true
            },
            members: {
                model:'WebRTC.model.chat.RoomMember',
                // storeId: 'roomMembers',
                autoLoad: true
            },
            feeds:{
                model:'WebRTC.model.chat.Message',
                autoLoad: true
            }
        }
    },

    bind : {
        title : '{room.name}'
    },

    items: [
        {
            xtype: 'chatvideowall',
            hidden: true,
            bodyPadding: 6,
            minHeight: 300,
            flex: 1
        },
        {
            layout: {
                type: 'box',
                vertical: false,
                align: 'stretch'
            },
            flex:4,
            items:[
                {
                    layout: {
                        type: 'box',
                        vertical: true,
                        align: 'stretch'
                    },
                    flex: 4,
                    bodyPadding: 6,
                    items: [
                        {
                            xtype: 'chatinfo',
                            bodyPadding: 6,
                            hidden: false
                        }, {
                            xtype: 'chathistory',
                            reference: 'chathistory',
                            flex: 2
                        }
                    ]
                },
                {
                    hidden: false,
                    layout: {
                        type: 'box',
                        vertical: true,
                        align: 'stretch'
                    },
                    flex: 1,
                    items: [
                        {
                            items: {
                                style: 'display: block; background-color:#eeeeee; background-image: url(https://static.opentok.com/webrtc/v2.6.0/images/rtc/audioonly-silhouette.svg); background-position: center bottom; background-repeat: no-repeat; background-size: auto 76%;',
                                xtype: 'container',
                                layout: 'fit',
                                minHeight: 180,
                                reference: 'you'
                            },
                            bodyPadding: 6,
                            bbar: [
                                {
                                    iconCls: 'x-fa fa-phone',
                                    bind: {
                                        disabled: '{inCall}'
                                    },
                                    listeners: {
                                        click: 'onCallRoom'
                                    }
                                }, {
                                    iconCls: 'x-fa fa-stop',
                                    bind: {
                                        disabled: '{!inCall}'
                                    },
                                    listeners: {
                                        click: 'onEndCall'
                                    }
                                }, '->',
                                {
                                    iconCls: 'x-fa fa-video-camera',
                                    bind: {
                                        disabled: '{!inCall}'
                                    },
                                    listeners: {
                                        click: 'onPublishVideoToggle'
                                    }
                                }, {
                                    iconCls: 'x-fa fa-microphone',
                                    bind: {
                                        disabled: '{!inCall}'
                                    },
                                    listeners: {
                                        click: 'onPublishAudioToggle'
                                    }
                                }
                            ]
                        }, {
                            title: 'Members',
                            collapsable: true,
                            xtype: 'chatmembers',
                            iconCls: 'x-fa fa-group fa-lg',
                            flex: 1
                        }, {
                            title: 'Files',
                            hidden: true,
                            reference: 'chatfiles',
                            // xtype: 'chatattachments',
                            iconCls: 'x-fa fa-paperclip',
                            flex: 1
                        }
                    ]
                }
            ]
        }
    ]



});