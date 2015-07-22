/**
 * @class WebRTC.controller.OpenTok
 * @extend Ext.app.Controller
 */
Ext.define('WebRTC.controller.OpenTok', {
    extend: 'Ext.app.Controller',
    alias: 'controller.opentok',
    id: 'opentok',
    listen: {
        controller: {
            '*': {
                joinroom: 'onSessionCreate',
                callroom: 'onCallRoom',
                endcall: 'onUnpublish',
                chatmessage: 'onChatEmit',
                showPublisherAudio: 'onShowAudio',
                hidePublisherAudio: 'onHideAudio',
                showPublisherVideo: 'onShowVideo',
                hidePublisherVideo: 'onHideVideo'
            }
        }
    },
    publisher: null,

    unmetRequirements: function(){
        Ext.toast({
            html: 'Your browser does not support WebRTC at this time.',
            title: 'Not Supported',
            width: 400,
            align: 't'
        });

    },

    getSessionById: function(sessionId){
        var session = Ext.StoreManager.lookup('WebRTC.store.opentok.Sessions').getById(sessionId);
        if(session){
            return session.get('session');

        }else{
            return null;
        }

    },

    bindSessionEvents: function(session){
        var me = this;
        session.on({
            'signal:chat': Ext.bind(me.onChatReceived,me),
            connectionCreated: Ext.bind(me.onConnectionCreated,me),
            connectionDestroyed: function connectionDestroyedHandler (event) {
                me.fireEvent('connectiondestroyed',event);
            },
            streamCreated: Ext.bind(me.onStreamCreated,me),
            streamDestroyed: Ext.bind(me.onStreamDestroyed,me),
            sessionConnected: Ext.bind(me.onSessionConnected,me),
            sessionDisconnected: function sessionDisconnectHandler(event) {
                me.fireEvent('sessiondisconnect',event);
            }
        });
    },


    onSessionCreate: function(component, data, name){

        if (OT.checkSystemRequirements() != 1) {
            me.unmetRequirements();
            return false;
        }

        var me = this,
            sessionId = data.sessionId,
            session = me.getSessionById(sessionId);

        if(!session){

            session = Ext.create('opentokSession',{
                id: data.sessionId,
                session: OT.initSession(data.apiKey, data.sessionId)
                });

            //create the event bindings prior to adding to the store
            me.bindSessionEvents(session.get('session'));

            //store the session in an store to make it public
            Ext.StoreManager.lookup('WebRTC.store.opentok.Sessions').add(session);


            me.getConnectionToken(session.get('session'), sessionId, name);

        }

        //set component session & connection so we can look for it later
        if(!component.sessionId){
            component.sessionId = data.sessionId; //room
        }

    },

    onSessionConnected: function(event) {
        this.fireEvent('sessionconnected',event);
    },


    getConnectionToken: function(session, sessionId, name){
        Ext.Ajax.request({
            url: '/data/token/' + sessionId,
            params: {
                role: 'publisher',
                name: name
            },
            success: function(response){
                //set session info on video room
                var sessionInfo = JSON.parse(response.responseText);
                session.connect(sessionInfo.token, function(error){
                    if (error) {
                        console.log('There was an error connecting to the session:', error.code, error.message);
                    }
                });
            }
        });
    },

    onConnectionCreated: function(event) {
       this.fireEvent('connectioncreated',event);
    },



    onStreamCreated: function(event) {
        this.fireEvent('streamcreated',event);
    },

    onStreamDestroyed: function(event) {
        this.fireEvent('streamdestroyed',event);
    },



    onChatEmit: function(sessionId,chat){
        var me= this,
            session = me.getSessionById(sessionId),
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
                    chat: chat
                }
            }, function (error) {
                if (error) {
                    showError()
                }
            });
        }
    },

    onChatReceived: function (event) {
        var from = event.from.connectionId,
            session = this.getSessionById(event.target.sessionId),
            myself = session.connection.connectionId;

        if(from != myself){
            this.fireEvent('chatreceived',event);
        }
    },



    onCallRoom: function(params){
        var me = this,
            session = me.getSessionById(params.sessionId);

        //can only publish one video per room
        if(!session.localPublisher) {

            session.localPublisher = OT.initPublisher(params.element, {
                insertMode: 'append',
                // fitMode:'contain',
                width: '100%',
                height: '100%',
                publishAudio: true,
                publishVideo : params.video,
                showControls: false
            });


            /*var movingAvg = null;
             session.localPublisher.on('audioLevelUpdated', function(event) {
             if (movingAvg === null || movingAvg <= event.audioLevel) {
             movingAvg = event.audioLevel;
             } else {
             movingAvg = 0.7 * movingAvg + 0.3 * event.audioLevel;
             }

             // 1.5 scaling to map the -30 - 0 dBm range to [0,1]
             var logLevel = (Math.log(movingAvg) / Math.LN10) / 1.5 + 1;
             logLevel = Math.min(Math.max(logLevel, 0), 1);
             // console.log(logLevel);
             // document.getElementById('publisherMeter').value = logLevel;
             });*/


            session.publish(session.localPublisher);
            // session.localPublisher.publishVideo(params.video);
        }

    },


    onUnpublish: function(sessionId, element){
        var me = this,
            session = me.getSessionById(sessionId);

        session.unpublish(session.localPublisher);
        session.localPublisher = null;
    },

    onShowVideo: function(sessionId){
        var me = this,
            session = me.getSessionById(sessionId);

       session.localPublisher.publishVideo(true);
    },

    onHideVideo: function(sessionId){
        var me = this,
            session = me.getSessionById(sessionId);

        session.localPublisher.publishVideo(false);
    },



    onShowAudio: function(sessionId){
        var me = this,
            session = me.getSessionById(sessionId);

        session.localPublisher.publishAudio(true);
    },

    onHideAudio: function(sessionId){
        var me = this,
            session = me.getSessionById(sessionId);

        session.localPublisher.publishAudio(false);
    },

    /*
    * some of this needs to get re-incorporated for startup
    * */
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