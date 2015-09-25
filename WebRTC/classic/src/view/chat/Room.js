Ext.define('WebRTC.view.chat.Room', {
    extend: 'Ext.Panel',
    xtype: 'chatroom',

    layout: {
        type: 'box',
        vertical: false,
        align: 'stretch'
    },

    controller: 'chatroom',

    viewModel: {
        type: 'chatroom'
    },

  /*  bind : {
        title : '{room.name}'
    },
*/
    items: [
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
                    bodyPadding: 8,
                    items: [
                        {
                            xtype: 'chatinfo',
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
                                cls: 'youBox',
                                xtype: 'container',
                                layout: 'fit',
                                minHeight: 180,
                                reference: 'you'
                            },
                            bind:{
                                hidden: '{!isWebRTCSupported}'
                            },
                            bodyPadding: 6,
                            bbar: [
                                {
                                    bind: {
                                        disabled: '{inVideoCall}',
                                        iconCls: '{audioCallIcon}'
                                    },
                                    tooltip: 'Toggle Audio Pubish',
                                    listeners: {
                                        click: 'onAudioCallRoom'
                                    }
                                },
                                {
                                    bind: {
                                        disabled: '{inAudioCall}',
                                        iconCls: '{videoCallIcon}'
                                    },
                                    tooltip: 'Toggle Video Pubish',
                                    listeners: {
                                        click: 'onVideoCallRoom'
                                    }
                                }
                                , '->',
                                {
                                    iconCls: 'x-fa fa-eye',
                                    tooltip: 'Toggle Camera',
                                    bind: {
                                        disabled: '{!inVideoCall}',
                                        iconCls: '{videoToggleIcon}'
                                    },
                                    listeners: {
                                        click: 'onPublishVideoToggle'
                                    }
                                }, {
                                    iconCls: 'x-fa fa-microphone',
                                    tooltip: 'Toggle Microphone',
                                    bind: {
                                        disabled: '{isMicDisabled}',
                                        iconCls: '{audioToggleIcon}'
                                    },
                                    listeners: {
                                        click: 'onPublishAudioToggle'
                                    }
                                }
                            ]
                        },{
                            // title: 'Members',
                            // iconCls: 'x-fa fa-group fa-lg',
                            // collapsable: true,
                            xtype: 'chatmembers',
                            flex: 1
                        }, {
                            title: 'Files',
                            hidden: true,
                            reference: 'chatfiles',
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
            minHeight: 300,
            flex: 1
        }
    ]



});