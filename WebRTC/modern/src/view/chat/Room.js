Ext.define('WebRTC.view.chat.Room', {
    extend: 'Ext.Panel',
    xtype: 'chatroom',

    layout: {
        type: 'box',
        orient: 'vertical',
        align: 'stretch'
    },

    controller: 'chatroom',

    viewModel: {
        type: 'chatroom'
    },

    items: [
        {
            layout: {
                type: 'hbox',
                vertical: false,
                align: 'stretch'
            },
            flex:3,
            items:[
                {
                    layout: {
                        type: 'box',
                        orient: 'vertical',
                        align: 'stretch'
                    },
                    flex: 4,
                    items: [
                        {
                            xtype: 'chatinfo',
                            hidden: true
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
                        orient: 'vertical',
                        align: 'stretch'
                    },
                    flex: 1,
                    items: [
                        {
                            items:[
                            {
                                style: 'display: block; background-color:#eeeeee; background-image: url(https://static.opentok.com/webrtc/v2.6.0/images/rtc/audioonly-silhouette.svg); background-position: center bottom; background-repeat: no-repeat; background-size: auto 76%;',
                                xtype: 'container',
                                layout: 'fit',
                                minHeight: 180,
                                bind:{
                                    hidden: '{!isWebRTCSupported}'
                                },
                                reference: 'you'
                            },{
                                xtype: 'toolbar',
                                docked: 'bottom',
                                bind:{
                                    hidden: '{!isWebRTCSupported}'
                                },
                                items: [
                                    {
                                        bind: {
                                            disabled: '{inVideoCall}',
                                            iconCls: '{audioCallIcon}'
                                        },
                                        listeners: {
                                            tap: 'onAudioCallRoom'
                                        }
                                    },
                                    {
                                        bind: {
                                            disabled: '{inAudioCall}',
                                            iconCls: '{videoCallIcon}'
                                        },
                                        listeners: {
                                            tap: 'onVideoCallRoom'
                                        }
                                    },
                                    {
                                        xtype: 'spacer'
                                    },
                                    {
                                        iconCls: 'x-fa fa-eye',
                                        bind: {
                                            disabled: '{!inVideoCall}',
                                            iconCls: '{videoToggleIcon}'
                                        },
                                        listeners: {
                                            tap: 'onPublishVideoToggle'
                                        }
                                    }, {
                                        iconCls: 'x-fa fa-microphone',
                                        bind: {
                                            disabled: '{isMicDisabled}',
                                            iconCls: '{audioToggleIcon}'
                                        },
                                        listeners: {
                                            tap: 'onPublishAudioToggle'
                                        }
                                    }
                                ]
                            }],
                            bodyPadding: 6
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
        },
        {
            xtype: 'chatvideowall',
            hidden: true,
            bodyPadding: 6,
            minHeight: 350,
            flex: 2
        }
    ]



});