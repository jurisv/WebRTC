Ext.define('WebRTC.OpenTokMixin', {
    extend: 'Ext.Mixin',
    mixinConfig: {
        id: 'opentok',
        after: {
            destroy: 'clearListeners'
        }
    },

    getRoomBySessionId: function(sessionId){
        var room = this.getView().child('chatroom[sessionId="' + sessionId + '"]');
        return room;
    },

    getSafeStreamCmpId:function(streamId){
        return 'stream' + streamId.replace(/-/g,'');
    },

    onOTConnectionCreated: function(event){
        var data = event.connection.data,
            sessionId = event.target.sessionId,
            room = this.getRoomBySessionId(sessionId),
            chunks = data.split('='),
            name = chunks[1];

        if(room){
            var member = Ext.create('WebRTC.model.chat.RoomMember',{
                name: name,
                id: event.connection.connectionId
            });

            room.getController().roomMemberAdd(member);
        }
    },

    onOTConnectionDestroyed: function(event){
        var id = event.connection.connectionId,
            room = this.getRoomBySessionId(event.target.sessionId);

        room.getController().roomMemberRemove(id);
    },



    onOTStreamCreated: function (event) {
        var OT = WebRTC.app.getController('WebRTC.controller.OpenTok'),
            session = OT.getSessionById(event.target.sessionId),
            room = this.getRoomBySessionId(event.target.sessionId),
            remotestreams = room.down('#remotestreams'),
            them = room.down('#them');

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
            height: 250,
            showControls: true
        });

        // put all the subsriptions into an array for us to walk-through and manipulate if needed
        // for example when changing rooms, mute all...
        session.localSubscriptions.push(subscription);


    },

    onOTStreamDestroyed: function (event) {
        var OT = WebRTC.app.getController('WebRTC.controller.OpenTok'),
            session = OT.getSessionById(event.target.sessionId),
            deadCmp = this.getView().down('#' + this.getSafeStreamCmpId(event.stream.id)),
            room = this.getRoomBySessionId(event.target.sessionId),
            remotestreams =  this.getView().down('#remotestreams');

        if(deadCmp){
            deadCmp.destroy();
            if(!remotestreams.items.length){
                remotestreams.hide();
            }
        }

        // find the subscription and remove it.
        var index = session.localSubscriptions.map(function(e) { return e.id; }).indexOf(event.stream.id);
        if(index || index == 0 ){
            session.localSubscriptions.splice(index, 1);
        }
    },


    onOTSessionConnected: function(event){},

    onOTSessionDestroyed: function(event){
        var type = event.type;

        if(type == 'sessionDisconnected'){
            var room = this.getRoomBySessionId(event.target.sessionId);

            if(room){
                room.getController().roomMemberRemove(id);
            }

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
        var room = this.getRoomBySessionId(event.target.sessionId);
        room.getController().chatReceived(event.data.chat);
    }

});