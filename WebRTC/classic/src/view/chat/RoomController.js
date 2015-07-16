Ext.define('WebRTC.view.chat.RoomController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.chatroom',

    roomMemberAdd: function(member){
        var store = this.getView().down('chatmembers').down('dataview').getStore('members');
       // var store = this.getView().down('chatmembers').down('dataview').getViewModel().getStore('members');
        store.add(member);
    },

    roomMemberRemove: function(id){
        var store = this.getView().down('chatmembers').down('dataview').getStore('members');
        // var store = this.getView().down('chatmembers').down('dataview').getViewModel().getStore('members'),
         idx = store.find('id',id);

         if(idx){
            store.removeAt(idx);
         }

    },


    onSpecialKey: function(f,e){
        if (e.getKey() == e.ENTER && !e.shiftKey ) {
            this.chatSend();
        }
        if (e.getKey() == e.UP) {
            alert('edit last')
        }
    },

    chatReceived: function(chat){
        var store = this.getView().down('chathistory').down('dataview').getStore('messages');
        store.add(chat);

        this.fireEvent('playsound','whistle');
    },

    chatSend: function(){
        var me = this,
            chat,
            list = me.lookupReference('historylist'),
            timestamp = new Date(),
            name = Ext.util.Cookies.get('user'),
            id = timestamp,
            sessionId = this.getViewModel().get('room.sessionId'),
            message = me.lookupReference('chattext');

        chat = {
            message: message.getValue(),
            id: id
        };

        message.focus(false,200);
        list.store.add({
            id: id,
            message: message.getValue(),
            from: name,
            time: timestamp
        });
        message.setValue('');
        list.scrollBy(0, 999999, true);

        me.fireEvent('chatmessage', sessionId, chat);
    },

    onCallRoom: function(){
        var you = this.lookupReference('you'),
            sessionId = this.getViewModel().get('room.sessionId');

        this.getViewModel().set('inCall', true);
        this.getViewModel().set('showingCamera', true);

        this.fireEvent('callroom', sessionId, you.id );

    },

    onEndCall: function(){
        var you = this.lookupReference('you'),
            sessionId = this.getViewModel().get('room.sessionId');

        this.getViewModel().set('inCall', false);
        this.getViewModel().set('showingCamera', false);

        this.fireEvent('endcall', sessionId, you.id );

    },

    onPublishAudioToggle: function(button){
        var you = this.lookupReference('you'),
            sessionId = this.getViewModel().get('room.sessionId');

        if( this.getViewModel().get('useMic') ){
            this.getViewModel().set('useMic',false);
            button.setIconCls('x-fa fa-microphone-slash');
            this.fireEvent('hidePublisherAudio', sessionId);
        }else{
            this.getViewModel().set('useMic',true);
            button.setIconCls('x-fa fa-microphone');
            this.fireEvent('showPublisherAudio', sessionId);
        }

    },

    onPublishVideoToggle: function(button){
        var you = this.lookupReference('you'),
            sessionId = this.getViewModel().get('room.sessionId');

        if( this.getViewModel().get('useCamera') ){
            this.getViewModel().set('useCamera',false);
            button.setIconCls('x-fa fa-ban');
            this.fireEvent('hidePublisherVideo', sessionId);
        }else{
            this.getViewModel().set('useCamera',true);
            button.setIconCls('x-fa fa-video-camera');
            this.fireEvent('showPublisherVideo', sessionId);
        }

    }

});
