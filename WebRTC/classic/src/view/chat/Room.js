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
            inAudioCall: false,
            inVideoCall: false,
            useMic: true,
            useCamera: true,
        },
        links: {
            room: {
                type: 'WebRTC.model.chat.Room',
                create: true
            }

        },
        // todo: remove messages and members and place as associated data stores of the room model.
        stores:{
            messages: {
                model:'WebRTC.model.chat.Message',
                autoSync: true,
                autoLoad: true
            },
            members: {
                model:'WebRTC.model.chat.RoomMember',
                autoLoad: true
            },
            feeds:{
                model:'WebRTC.model.chat.Message',
                autoLoad: true
            }
        },
        formulas:{
            audioCallIcon: function(get){
                if(get('inAudioCall')){
                   return 'x-fa fa-stop';
                }else{
                   return 'x-fa fa-phone';
                }
            },
            videoCallIcon: function(get){
                if(get('inVideoCall')){
                    return 'x-fa fa-stop';
                }else{
                    return 'x-fa fa-video-camera';
                }
            },
            audioToggleIcon: function(get){
                if(get('useMic')){
                    return 'x-fa fa-microphone';
                }else{
                    return 'x-fa fa-microphone-slash';
                }
            },
            videoToggleIcon: function(get){
                if(get('useCamera')){
                    return 'x-fa fa-eye';
                }else{
                    return 'x-fa fa-ban';
                }
            },
            isMicDisabled: function(get){
                if(get('inAudioCall') || get('inVideoCall')){
                    return false;
                }else{
                    return true;
                }
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
                                    bind: {
                                        disabled: '{inVideoCall}',
                                        iconCls: '{audioCallIcon}'
                                    },
                                    listeners: {
                                        click: 'onAudioCallRoom'
                                    }
                                },
                                {
                                    bind: {
                                        disabled: '{inAudioCall}',
                                        iconCls: '{videoCallIcon}'
                                    },
                                    listeners: {
                                        click: 'onVideoCallRoom'
                                    }
                                }
                                , '->',
                                {
                                    iconCls: 'x-fa fa-eye',
                                    bind: {
                                        disabled: '{!inVideoCall}',
                                        iconCls: '{videoToggleIcon}'
                                    },
                                    listeners: {
                                        click: 'onPublishVideoToggle'
                                    }
                                }, {
                                    iconCls: 'x-fa fa-microphone',
                                    bind: {
                                        disabled: '{isMicDisabled}',
                                        iconCls: '{audioToggleIcon}'
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