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

    getSafeStreamCmpId:function(streamId){
        return 'stream' + streamId.replace(/-/g,'');
    },



    onOTConnectionCreated: function(event){
        var data = event.connection.data,
            sessionId = event.target.sessionId,
            tab = this.getRoomBySessionId(sessionId),
            chunks = data.split('='),
            name = chunks[1];

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
            tab = this.getRoomBySessionId(event.target.sessionId),
            // view = this.getView(),
            remotestreams = tab.down('#remotestreams'),
            them = tab.down('#them');

        if( this.lookupReference('roomtabs').getActiveTab().sessionId == tab.sessionId ){
            if(remotestreams.isHidden()){
                remotestreams.show()
            }
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
        var OT = WebRTC.app.getController('WebRTC.controller.OpenTok'),
            session = OT.getSessionById(event.target.sessionId),
            deadCmp = this.getView().down('#' + this.getSafeStreamCmpId(event.stream.id)),
            tab = this.getRoomBySessionId(event.target.sessionId),
            // view = this.getView(),
            remotestreams = tab.down('#remotestreams');

        // console.log(deadCmp);

        if( this.lookupReference('roomtabs').getActiveTab().sessionId == tab.sessionId ){
            if(deadCmp){
                deadCmp.destroy();
                if(!remotestreams.items.length){
                    remotestreams.hide();
                }
            }
        }

        // find the subscription and remove it.
        var index = session.localSubscriptions.map(function(e) { return e.id; }).indexOf(event.stream.id);
        if(index || index == 0 ){
            session.localSubscriptions.splice(index, 1);
        }
    },


    onOTSessionConnected: function(event){
    },

    onOTSessionDestroyed: function(event){
        var type = event.type;

        if(type == 'sessionDisconnected'){
            var tab = this.getRoomBySessionId(event.target.sessionId);

            if(tab){
                tab.getController().roomMemberRemove(id);
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
        var tab = this.getRoomBySessionId(event.target.sessionId);

        tab.getController().chatReceived(event.data.chat);
    }

});