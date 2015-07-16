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

        if(tab){
            tab.getController().roomMemberAdd({
                name: name,
                id: event.connection.connectionId
            });

            this.fireEvent('playsound','whistle');

        }

    },

    onOTConnectionDestroyed: function(event){
        var id = event.connection.connectionId,
            tab = this.getRoomBySessionId(event.target.sessionId);

        tab.getController().roomMemberRemove(id);
    },


    onOTStreamCreated: function (event) {
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
        var OT = WebRTC.app.getController('WebRTC.controller.OpenTok'),
            stream = event.stream,
            session = OT.getSessionById(event.target.sessionId),
            view = this.getView(),
            remotestreams = view.down('#remotestreams'),
            them = view.down('#them');

        var newly = remotestreams.add({
            xtype: 'panel',
            flex: 1,
            layout: 'fit'
        });


        var subscriber = session.subscribe(event.stream, newly.id , {
            insertMode: 'replace',
            style: {
            audioLevelDisplayMode: 'auto'
            //   backgroundImageURI : '/resources/images/BlankAvatar.png'
           },
           // fitMode:'contain',
           width: '100%',
           height: '100%',
           showControls: true
        });

        // console.log(subscriber.id);

    },

    onOTStreamDestroyed: function (event) {
        console.log('A stream was destroyed.');
    },


    onOTSessionConnected: function(event){
/*
        var sessionId = event.target.sessionId,
            tab = this.getRoomBySessionId(sessionId);

        tab.getController().roomMemberAdd({});
*/
    },

    onOTSessionDestroyed: function(event){
        var id = event.connection.connectionId,
            tab = this.getRoomBySessionId(event.target.sessionId);

        tab.getController().roomMemberRemove(id);

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
            now = new Date(),
            tab = this.getRoomBySessionId(event.target.sessionId);

            var data = event.from.data,
                name = eval('{' + data.replace('=',':"') + '"}'),
                chat = {
                    id: event.data.id,
                    message: event.data.message,
                    from: name,
                    time: now
                };
            tab.getController().chatReceived(chat);
    }

});