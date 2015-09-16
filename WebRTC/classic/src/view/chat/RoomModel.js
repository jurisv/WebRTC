Ext.define('WebRTC.view.chat.RoomModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.chatroom',

    data: {
        inAudioCall: false,
        inVideoCall: false,
        useMic: true,
        useCamera: true
    },
    links: {
        room: {
            type: 'WebRTC.model.chat.Room',
            create: true
        }
    },

    stores:{
        messages: {
            model: 'WebRTC.model.chat.Message',
            sorters:[
                {property: 'date', diection: 'DESC'}
            ],
            autoSync: true,
            autoLoad: true,
            listeners: {
                load: 'onMessagesLoad'
            }
        },
        members: {
            model:'WebRTC.model.chat.RoomMember',
            sorters:[
                {property: 'name', diection: 'ASC'}
            ],
            autoSync: true,
            autoLoad: true,
            listeners: {
                load: function(){
                   // console.log('roommembers loaded')
                }
            }
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
        },
        isWebRTCSupported: function(get){
            if (Ext.browser.is.Safari  || Ext.browser.is.IE ) {
                return false;
            }else{
                if( !!window.webkitRTCPeerConnection || !!window.mozRTCPeerConnection ) {
                    return true;
                }else{
                    return false;
                }
            }

        }
    }

});
