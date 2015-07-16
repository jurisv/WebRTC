Ext.define('WebRTC.view.chat.RoomController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.chatroom',

    roomMemberAdd: function(member){
        var store = this.getViewModel().getStore('members');
        store.add(member);
        this.fireEvent('playsound','whistle');
    },

    roomMemberRemove: function(id){
        var store = this.getViewModel().getStore('members'),
            idx = store.find('id',id);

        if(idx){
            store.removeAt(idx);
            this.fireEvent('playsound','whistle');
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
        var store = this.getViewModel().getStore('messages'),
            message = Ext.create('WebRTC.model.chat.Message',chat);

        message.set({mine:false});

        store.add(chat);

        this.fireEvent('playsound','whistle');
    },

    chatSend: function(){
        var me = this,
            chat,
            store = this.getViewModel().getStore('messages'),
            list = me.lookupReference('historylist'),
            timestamp = new Date().toISOString(),
            name = Ext.util.Cookies.get('user'),
            id = timestamp,
            sessionId = this.getViewModel().get('room.sessionId'),
            message = me.lookupReference('chattext');

        chat = Ext.create('WebRTC.model.chat.Message',{
            message: message.getValue(),
            mine: true,
            from: this.getViewModel().get('name'),
            date: timestamp,
            id: id
        });

        message.focus(false,200);
        message.setValue('');

        store.add(chat);
        list.scrollBy(0, 999999, true);

        me.fireEvent('chatmessage', sessionId, chat.data);
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
