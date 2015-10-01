Ext.define('WebRTC.view.chat.RoomController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.chatroom',

    unread: 0,

    listen: {
        /*
         * Any controller that fires authorize needs us to handle it and then run the next steps
         * passed in to the request.
         */
        controller: {
            'auth': {
                visibilityChanged: 'onVisibilityChanged'
            }
        }
    },

    roomMemberAdd: function(member){
       // var store = this.getViewModel().getStore('members');
       // store.add(member);

       this.fireEvent('playsound','enter-sound');
    },

    roomMemberRemove: function(id){
        var store = this.getViewModel().getStore('members'),
            idx = store.find('id',id);

        if(idx >= 0){
            // store.removeAt(idx);
            this.fireEvent('playsound','leave-sound');
        }

    },


    chatReceived: function(chat){
        var me = this,
            list = this.getView().down('dataview[reference=historylist]'),
            store = this.getViewModel().getStore('messages');

        store.add(chat);

        if(list){
            list.scrollBy(0, 999999, true);
        }

        me.unread++;
        me.setUnreadTitle();

        this.fireEvent('playsound','chat-sound');
    },

    onVisibilityChanged: function(){
        var me=this;
        if(!document.hidden) {
            me.unread = 0;
        }
        me.setUnreadTitle();
    },

    setUnreadTitle: function(){
        var me=this;
        if(!me.orginalTitle){
            me.orginalTitle = window.document.title;
        }
        if( document.hidden && me.unread != 0  ){
            window.document.title = '(' + me.unread + ') Unread Chat | ' + me.orginalTitle;
        }else{
            window.document.title = me.orginalTitle;
        }
    },


    onAudioCallRoom: function(button){
        var you = this.lookupReference('you'),
            auth = WebRTC.app.getController('Auth'),
            sessionId = this.getViewModel().get('room.sessionId');

        if( !this.getViewModel().get('inAudioCall') ){
            this.getViewModel().set('inAudioCall', true);
            this.getViewModel().set('showingCamera', false);
            this.setMemberCallStatus({callStatus:'audio'});
            auth.setPresenseStatus({
                status: 'busy',
                statusOrder: 60,
                lastActivity: null
            });
            this.fireEvent('callroom', {sessionId: sessionId, element: you.id, video: false} );
        }else{
            this.onEndAudioCall(button);
        }

    },

    onVideoCallRoom: function(button){
        var you = this.lookupReference('you'),
            auth = WebRTC.app.getController('Auth'),
            sessionId = this.getViewModel().get('room.sessionId');

        if( !this.getViewModel().get('inVideoCall') ){
            this.getViewModel().set('inVideoCall', true);
            this.getViewModel().set('showingCamera', true);
            this.setMemberCallStatus({callStatus:'video'});
            auth.setPresenseStatus({
                status: 'busy',
                statusOrder: 60,
                lastActivity: null
            });
            this.fireEvent('callroom',  {sessionId: sessionId, element: you.id, video: true} );
        }else{
            this.onEndVideoCall(button);
        }
    },


    onEndAudioCall: function(button){
        var you = this.lookupReference('you'),
            auth = WebRTC.app.getController('Auth'),
            sessionId = this.getViewModel().get('room.sessionId');

        this.getViewModel().set('inAudioCall', false);
        this.getViewModel().set('useCamera', true);
        this.getViewModel().set('useMic',true);

        this.setMemberCallStatus({callStatus:'idle'});
        this.setMemberCallStatus({micStatus:''});
        auth.setPresenseStatus({
            status: 'online',
            statusOrder: 100,
            lastActivity: null
        });

        this.fireEvent('endcall', sessionId, you.id );

    },

    onEndVideoCall: function(button){
        var you = this.lookupReference('you'),
            auth = WebRTC.app.getController('Auth'),
            sessionId = this.getViewModel().get('room.sessionId');

        this.getViewModel().set('inVideoCall', false);
        this.getViewModel().set('useCamera', true);
        this.getViewModel().set('useMic',true);

        this.setMemberCallStatus({
            callStatus:'idle',
            micStatus:''
        });
        // this.setMemberCallStatus({micStatus:''});
        auth.setPresenseStatus({
            status: 'online',
            statusOrder: 100,
            lastActivity: null
        });

        this.fireEvent('endcall', sessionId, you.id );

    },

    setMemberCallStatus: function(status){
        var auth = WebRTC.app.getController('Auth'),
            id = this.getViewModel().get('room')['id'],
            user = this.getViewModel().get('user');


        if(user){
            var userId = user['id'],
                membersRef = auth.firebaseRef.child('roommembers/' + id + '/' + userId);
            membersRef.update(status);
        }
    },

    onPublishAudioToggle: function(button){
        var you = this.lookupReference('you'),
            sessionId = this.getViewModel().get('room.sessionId');

        if( this.getViewModel().get('useMic') ){
            this.getViewModel().set('useMic',false);
            this.setMemberCallStatus({micStatus:'mute'});
            this.fireEvent('hidePublisherAudio', sessionId);
        }else{
            this.getViewModel().set('useMic',true);
            this.setMemberCallStatus({micStatus:''});
            this.fireEvent('showPublisherAudio', sessionId);
        }

    },

    onPublishVideoToggle: function(button){
        var you = this.lookupReference('you'),
            sessionId = this.getViewModel().get('room.sessionId');

        if( this.getViewModel().get('useCamera') ){
            this.getViewModel().set('useCamera',false);
            this.setMemberCallStatus({callStatus:'video-hide'});
            this.fireEvent('hidePublisherVideo', sessionId);
        }else{
            this.getViewModel().set('useCamera',true);
            this.setMemberCallStatus({callStatus:'video'});
            this.fireEvent('showPublisherVideo', sessionId);
        }

    },

    onMessagesLoad: function(){
        this.fireEvent('playsound','chat-sound');
    }

});
