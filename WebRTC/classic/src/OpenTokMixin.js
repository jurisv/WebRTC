Ext.define('WebRTC.OpenTokMixin', {
    extend: 'Ext.Mixin',
    mixinConfig: {
        id: 'opentok',
        after: {
            destroy: 'clearListeners'
        }
    },

    getRoomBySessionId: function(sessionId){
        var roomtabs = this.lookupReference('roomtabs'),
            tab = roomtabs.child('chatroom[sessionId="' + sessionId + '"]');

        return tab;
    },


    onOTConnectionCreated: function(event){
        var data = event.connection.data,
            sessionId = event.target.sessionId,
            tab = this.getRoomBySessionId(sessionId),
            name = eval('{' + data.replace('=',':"') + '"}');

        tab.getController().roomMemberAdd({
            name: name,
            id: event.connection.connectionId
        });
    },

    onOTConnectionDestroyed: function(event){
        var id = event.connection.connectionId,
            tab = this.getRoomBySessionId(event.target.sessionId);

        tab.getController().roomMemberRemove(id);
    },


    onOTStreamCreated: function (event) {
        console.log('A new stream published.');
        // Create a container for a new Subscriber, assign it an id using the streamId, put it inside
        // the element with id="subscribers"
        // var subContainer = document.createElement('div');
        // subContainer.id = 'stream-' + event.stream.streamId;
        // document.getElementById(me.getView().down('#subscribers').id).appendChild(subContainer);

        /*
         var stream = Ext.create('Ext.panel,Panel',{
         itemId: event.stream.streamId,
         layout: 'fit'
         });

         me.getView().down('#subscribers').add(stream);
         */


        // Subscribe to the stream that caused this event, put it inside the container we just made
        // session.subscribe(event.stream, me.getView().down('#subscribers').down('#' + event.stream.streamId).id);

        //session.subscribe(event.stream, me.getView().down('#subscribers').id, {insertMode: 'append'});
    },

    onOTStreamDestroyed: function (event) {
        console.log('A stream was destroyed.');
    },


    onOTSessionConnected: function(event){
        var sessionId = event.target.sessionId,
            tab = this.getRoomBySessionId(sessionId);

       // tab.getController().roomMemberAdd({});
    },

    onOTSessionDestroyed: function(event){
        console.log('session disconnect');
        if (event.reason == "networkDisconnected") {
            Ext.toast({
                html: 'Your network connection terminated.',
                title: 'Offline',
                width: 400,
                align: 't'
            });
        }
    },


    onOTChatReceived: function(event){
        var me=this,
            tab = this.getRoomBySessionId(event.target.sessionId);

            var data = event.from.data,
                name = eval('{' + data.replace('=',':"') + '"}'),
                chat = {
                    id: event.data.id,
                    message: event.data.message,
                    from: name
                };
            tab.getController().chatReceived(chat);
    }

});