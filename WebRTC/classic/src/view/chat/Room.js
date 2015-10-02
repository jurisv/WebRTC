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
                type: 'box',
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
                            bodyPadding: 6,
                            items: [{
                                xtype: 'container',
                                // cls: 'youBox',
                                layout: 'fit',
                                hidden: true,
                                minwidth: 200,
                                height: 200,
                                minHeight: 180,
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
                            xtype: 'chatvideowall',
                            hidden: true,
                            bodyPadding: 6,
                            minHeight: 200,
                            flex: 3
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