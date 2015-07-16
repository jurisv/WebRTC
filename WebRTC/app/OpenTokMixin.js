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

    getSafeStreamCmpId:function(streamId){
        return 'stream' + streamId.replace(/-/g,'');
    },

    onOTStreamCreated: function (event) {
          var OT = WebRTC.app.getController('WebRTC.controller.OpenTok'),
            session = OT.getSessionById(event.target.sessionId),
            view = this.getView(),
            remotestreams = view.down('#remotestreams'),
            them = view.down('#them');

        var newly = remotestreams.add({
            xtype: 'panel',
            bodyPadding: 3,
            itemId: this.getSafeStreamCmpId(event.stream.id),
            html:'<div id="' + event.stream.id + '"></div>',
            flex: 1,
            minHeight: 200,
            width: 300
        });

        var subscriber = session.subscribe(event.stream, event.stream.id , {
            /// insertMode: 'append',
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
        var deadCmp = this.getView().down('#' + this.getSafeStreamCmpId(event.stream.id) );
        console.log(deadCmp);
        if(deadCmp){
            deadCmp.destroy();
        }
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