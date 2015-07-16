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
            var member = Ext.create('WebRTC.model.chat.RoomMember',{
                name: name,
                id: event.connection.connectionId
            });

            tab.getController().roomMemberAdd(member);
        }
    },

    onOTConnectionDestroyed: function(event){
        var id = event.connection.connectionId,
            tab = this.getRoomBySessionId(event.target.sessionId);

        tab.getController().roomMemberRemove(id);
    },


    onOTStreamCreated: function (event) {
          var OT = WebRTC.app.getController('WebRTC.controller.OpenTok'),
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

    },

    onOTStreamDestroyed: function (event) {
    },


    onOTSessionConnected: function(event){
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
        var tab = this.getRoomBySessionId(event.target.sessionId);

        tab.getController().chatReceived(event.data.chat);
    }

});