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

    items: [
        {
            layout: {
                type: 'border',
                vertical: false,
                align: 'stretch'
            },
            flex: 4,
            items: [
                {
                    layout: {
                        type: 'box',
                        vertical: true,
                        align: 'stretch'
                    },
                    region: 'center',
                    flex: 1,
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
                    region: 'east',
                    collapsable: true,
                    collasped: true,
                    split:true,
                    layout: {
                        type: 'box',
                        vertical: true,
                        align: 'stretch'
                    },
                    minWidth: 250,
                    resizable: true,
                    flex: 1,
                    items: [
                        {
                            xtype: 'toolbar',
                            docked: 'top',
                            cls: 'roomControls',
                            bind: {
                                hidden: '{!isWebRTCSupported}'
                            },
                            items: [
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
                            xtype:'panel',
                            // bodyPadding: 3,
                            bodyStyle: 'background-color: #cacaca; margin:10px;',
                            layout: {
                                type: 'box',
                                pack: 'center',
                                align: 'center'
                            },
                            items: [{
                                xtype: 'container',
                                bodyPadding: 4,
                                // cls: 'youBox',
                                layout: 'fit',
                                hidden: true,
                                maxWidth: 400,
                                maxHeight: 400,
                                minwidth: 200,
                                height: 150,
                                width: 225,
                                minHeight: 110,
                                reference: 'you'
                            }],
                            bind: {
                                hidden: '{!isWebRTCSupported}'
                            }

                        },
                        {
                            // title: 'Members',
                            // iconCls: 'x-fa fa-group fa-lg',
                            // collapsable: true,
                            xtype: 'chatmembers',
                            minHeight: 80,
                            flex: 1
                        }, {
                            layout: 'fit',
                            flex: 2,
                            items:[{
                                xtype: 'chatvideowall',
                                hidden: true,
                                bodyPadding: 10,
                                minHeight: 200,
                                autoScroll: true,
                                flex: 1
                            }]
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
        }

    ]


});