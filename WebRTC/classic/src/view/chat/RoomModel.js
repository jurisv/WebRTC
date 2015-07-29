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

});
