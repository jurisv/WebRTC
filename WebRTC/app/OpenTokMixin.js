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

        if(remotestreams.isHidden()){
            remotestreams.show()
        }

        var newly = remotestreams.add({
            xtype: 'panel',
            bodyPadding: 3,
            itemId: this.getSafeStreamCmpId(event.stream.id),
            html:'<div id="' + event.stream.id + '"></div>',
            flex: 1,
            minHeight: 250,
            maxWidth: 400
        });

        var subscription = session.subscribe(event.stream, event.stream.id , {
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

        // put all the subsriptions into an array for us to walk-through and manipulate if needed
        // for example when changing rooms, mute all...
        session.localSubscriptions.push(subscription);


    },

    onOTStreamDestroyed: function (event) {
        var deadCmp = this.getView().down('#' + this.getSafeStreamCmpId(event.stream.id)),
            view = this.getView(),
            remotestreams = view.down('#remotestreams');
        console.log(deadCmp);
        if(deadCmp){
            deadCmp.destroy();
            if(!remotestreams.items.length){
                remotestreams.hide();
            }
        }
    },


    onOTSessionConnected: function(event){
    },

    onOTSessionDestroyed: function(event){
        var type = event.type;

        if(type == 'sessionDisconnected'){
            return;
        }else if(type == 'sessionDisconnected'){
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
        }

    },


    onOTChatReceived: function(event){
        var tab = this.getRoomBySessionId(event.target.sessionId);

        tab.getController().chatReceived(event.data.chat);
    }

});