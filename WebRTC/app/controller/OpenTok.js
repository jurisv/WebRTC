/**
 * @class WebRTC.controller.OpenTok
 * @extend Ext.app.Controller
 */
Ext.define('WebRTC.controller.OpenTok', {
    extend: 'Ext.app.Controller',
    alias: 'controller.opentok',
    listen: {
        controller: {
            '*': {
                OTinitSession: 'onInitSession',
                chatmessage: 'onChatEmit'
            }
        }
    },

    onChatEmit: function(controller,chat){
     var session = controller.getViewModel().getData().session,
            showError = function(){
                Ext.toast({
                    html: 'There was an error sending your message.',
                    title: 'Send Error',
                    width: 400,
                    align: 't'
                })};

        if(!session){
            showError();
        }else{
            session.signal({
                type: 'chat',
                data: {
                    id: chat.id,
                    message: chat.message
                }
            }, function (error) {
                if (error) {
                    showError()
                }
            });
        }
    },

    onInitSession: function(component, data){
        var me = this;

        //OT is included in the app.JSON as a resource for OpenTok
        // The client does not support WebRTC.
        if (OT.checkSystemRequirements() != 1) {
            component.disable();
            Ext.toast({
                html: 'Your browser does not support WebRTC at this time.',
                title: 'Not Supported',
                width: 400,
                align: 't'
            });

        } else {

            if(!component.getViewModel().get('otSession')){

                //This is where the room session is initialized with OpenTok
                component.getViewModel().set('otSession', OT.initSession(data.apiKey, data.sessionId));

                //Once we have a session we need to bind session events to the component
                me.bindSessionEvents(component);


                component.getViewModel().get('otSession').connect(data.token);
            }
        }
    },

    bindSessionEvents: function(component){

        //TODO: this needs to be decoupled and work
        var me= this,
            session = component.getViewModel().get('otSession');

        session.on({
            connectionCreated: Ext.bind(me.onConnectionCreated,me),
            'signal:chat': Ext.bind(me.onChatReceived,me),
            // streamCreated: Ext.bind(me.onStreamCreated,me),
            // streamDestroyed: Ext.bind(me.onStreamDestroyed,me),
            sessionConnected: Ext.bind(me.onSessionConnected,me),
            connectionDestroyed: function connectionDestroyedHandler (event) {
                var store = me.getView().down('grid[title=Users]').getStore(),
                    idx = store.find('id',event.connection.connectionId);

                if(idx){
                    store.removeAt(idx);
                }
            },
            sessionDisconnected: function sessionDisconnectHandler(event) {
                // The event is defined by the SessionDisconnectEvent class
                console.log('session disconnect');
                if (event.reason == "networkDisconnected") {
                    Ext.toast({
                        html: 'Your network connection terminated.',
                        title: 'Offline',
                        width: 400,
                        align: 't'
                    });
                }
            }
        });
    },



    /*
    *
    *  Not implemented yet but need to
    *
    * */


    onSessionConnected: function(event) {

        var me=this,
            sessionInfo = this.getViewModel().get('otSessionInfo'),
            session = this.getViewModel().get('otSession');

        // var publisher = OT.initPublisher(sessionInfo.apiKey, me.getView().down('#publisher').id);

        // Publish the publisher we initialzed earlier (this will trigger 'streamCreated' on other
        // clients)
        // session.publish(publisher);
    },



    onStreamCreated: function (event) {
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

    onStreamDestroyed: function (event) {
        console.log('A stream was destroyed.');
    },




    onConnectionCreated: function(event) {
        var me=this,
            session = this.getViewModel().get('otSession'),
            data = event.connection.data,
            name = eval('{' + data.replace('=',':"') + '"}');

        me.getView().down('grid[title=Users]').getStore().add({
            name: name,
            id: event.connection.connectionId
        });

    },

    onChatReceived: function (event) {
        var me=this,
            session = this.getViewModel().get('otSession');

        if (event.from.connectionId !== session.connection.connectionId) {
            var historyGrid = me.getView().down('grid[title=History]'),
                data = event.from.data,
                name = eval('{' + data.replace('=',':"') + '"}');

            historyGrid.getStore().add({
                id: event.data.id,
                message: event.data.message,
                from: name
            });
        }
    },







    onRoomShow: function(){
        var me = this,
            openTok = me.getViewModel().get('otSessionInfo');

        //OT is included in the app.JSON as a resource for OpenTok
        // The client does not support WebRTC.
        if (OT.checkSystemRequirements() != 1) {
            me.getView().disable();
            Ext.toast({
                html: 'Your browser does not support WebRTC at this time.',
                title: 'Not Supported',
                width: 400,
                align: 't'
            });

        } else {

            if(!me.getViewModel().get('otSession')){
                me.getViewModel().set('otSession', OT.initSession(openTok.apiKey, openTok.sessionId));
                me.bindSessionEvents(me.getViewModel().get('otSession'));
                me.getViewModel().get('otSession').connect(openTok.token);
            }
        }
    },

    getGlobalSession: function(controller){
        var me=this;

        //get the global TokBox session
        Ext.Ajax.request({
            url: '/data/global/',
            params: {
                role: 'publisher',
                name: controller.getViewModel().get('name')
            },
            success: function(response){
                var sessionInfo = JSON.parse(response.responseText);
                //  controller.getView().down('chatroom').getViewModel().set('otSessionInfo', sessionInfo );
            }
        });

        Ext.Ajax.request({
            url: '/data/token/1_MX40NTI1NDI2Mn5-MTQzMzk1NTY3NDMyMn5Xd0FpdUFYSEdFaVUwaVY4M3ZTS3RyT2p-UH4',
            params: {
                role: 'publisher',
                name: controller.getViewModel().get('name')
            },
            success: function(response){
                //set session info on video room
                var sessionInfo = JSON.parse(response.responseText);
                // controller.getView().down('videoroom').getViewModel().set('otSessionInfo', sessionInfo );
            }
        });
    }





});