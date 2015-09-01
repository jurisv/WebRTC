/**
 * @class Sencha.ux.controller.OpenTok
 * @extend Ext.app.Controller
 */
Ext.define('opentok.controller.OpenTok', {
    extend: 'Ext.app.Controller',
    alias: 'controller.opentok',
    id: 'opentok',
    listen: {
        controller: {
            '*': {
                joinroom: 'onSessionCreate',
                pauseroom: 'onPauseRoom',
                resumeroom: 'onResumeRoom',
                closeroom: 'onCloseRoom',
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
            html: 'Your browser does not support WebRTC at this time. You will not be able to do Audio/Video Conferences.',
            title: 'Not Supported',
            width: 400,
            align: 't'
        });

    },



    getSessionById: function(sessionId){
        var session = Ext.getStore('opentok.store.Sessions').getById(sessionId);
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
            archiveStarted: Ext.bind(me.onArchiveStarted,me),
            archiveStopped: Ext.bind(me.onArchiveStopped,me),
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
           // this.unmetRequirements();
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

            //create an empty array to store subscriptions into for bulk manipulation
            session.get('session').localSubscriptions = [];

            //store the session in an store to make it public
            Ext.getStore('opentok.store.Sessions').add(session);

            // either initial or reOpening room we need to connect to server
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
        //If opentok supported and session is valid then use WebRTC signals
        if (OT.checkSystemRequirements() == 1) {

            var me= this,
            session = me.getSessionById(sessionId),
            showError = function(){
                Ext.toast({
                    html: 'There was an error sending your message.',
                    title: 'Send Error',
                    width: 400,
                    align: 't'
                })};

            if (!session) {
                showError();
            } else {
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
        //If opentok supported and session is valid then use WebRTC signals
        if (OT.checkSystemRequirements() == 1) {
            var me = this,
                session = me.getSessionById(params.sessionId);

            //can only publish one video per room
            if (!session.localPublisher) {

                session.localPublisher = OT.initPublisher(params.element, {
                    insertMode: 'append',
                    // fitMode:'contain',
                    // width: '100%',
                    // height: '100%',
                    publishAudio: true,
                    publishVideo: params.video,
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
        }
    },


    onUnpublish: function(sessionId, element){
        var me = this,
            session = me.getSessionById(sessionId);

        if(session && session.localPublisher){
            session.unpublish(session.localPublisher);
            session.localPublisher = null;
        }

    },

    onShowVideo: function(sessionId){
        var me = this,
            session = me.getSessionById(sessionId);
        if(session.localPublisher) {
            if( Ext.isFunction(session.localPublisher.publishVideo) ) {
                session.localPublisher.publishVideo(true);
            }
        }
    },

    onHideVideo: function(sessionId){
        var me = this,
            session = me.getSessionById(sessionId);
        if(session.localPublisher) {
            if( Ext.isFunction(session.localPublisher.publishVideo) ) {
                session.localPublisher.publishVideo(false);
            }
        }
    },


    onShowAudio: function(sessionId){
        var me = this,
            session = me.getSessionById(sessionId);
        if(session.localPublisher){
            if( Ext.isFunction(session.localPublisher.publishAudio) ) {
                session.localPublisher.publishAudio(true);
            }
        }
    },

    onHideAudio: function(sessionId){
        var me = this,
            session = me.getSessionById(sessionId);
        if(session.localPublisher){
            if( Ext.isFunction(session.localPublisher.publishAudio) ) {
                session.localPublisher.publishAudio(false);
            }
        }

    },



    onResumeRoom: function(sessionId){
        //If opentok supported and session is valid then use WebRTC signals
        if (OT.checkSystemRequirements() == 1) {
            var me = this,
                session = me.getSessionById(sessionId);

            if (session) {
                Ext.each(session.localSubscriptions, function (subscriber) {
                    if (Ext.isFunction(subscriber.subscribeToAudio)) {
                        subscriber.subscribeToAudio(true);
                    }
                });

                if (session.localPublisher) {
                    var stream = session.localPublisher.stream;
                    if (stream.hadAudio) {
                        if (Ext.isFunction(session.localPublisher.publishAudio)) {
                            session.localPublisher.publishAudio(true);
                        }
                    }
                    if (stream.hadVideo) {
                        if (Ext.isFunction(session.localPublisher.publishVideo)) {
                            session.localPublisher.publishVideo(true);
                        }
                    }
                }
            }
        }
    },

    onPauseRoom: function(sessionId){
        //If opentok supported and session is valid then use WebRTC signals
        if (OT.checkSystemRequirements() == 1) {
            var me = this,
                session = me.getSessionById(sessionId);

            if (session) {
                Ext.each(session.localSubscriptions, function (subscriber) {
                    if (Ext.isFunction(subscriber.subscribeToAudio)) {
                        subscriber.subscribeToAudio(false);
                    }
                });

                if (session.localPublisher) {
                    var stream = session.localPublisher.stream;
                    if (stream.hasAudio) {
                        stream.hadAudio = stream.hasAudio;
                        if (Ext.isFunction(session.localPublisher.publishAudio)) {
                            session.localPublisher.publishAudio(false);
                        }
                    }
                    if (stream.hasVideo) {
                        stream.hadVideo = stream.hasVideo;
                        if (Ext.isFunction(session.localPublisher.publishVideo)) {
                            session.localPublisher.publishVideo(false);
                        }
                    }
                }
            }
        }
    },

    onCloseRoom: function(sessionId){
        //If opentok supported and session is valid then use WebRTC signals
        if (OT.checkSystemRequirements() == 1) {
            //stop broadcasting if we were when we closed
            this.onUnpublish(sessionId);
            //close out all the remaining session stuff.
            this.removeSession(sessionId);
        }
    },



    removeSession: function(sessionId){
        var sessions = Ext.getStore('opentok.store.Sessions'),
            session = sessions.getById(sessionId);

        if(session){
            session.get('session').off();
            session.get('session').disconnect();
            sessions.remove(session);
            sessions.sync();
        }
    },



    onArchiveStarted: function(event){
        this.fireEvent('archivestarted',event);
    },

    onArchiveStopped: function(event){
        this.fireEvent('archivestopped',event);
    },



    /*
    * some of this might need to get re-incorporated for startup for global users
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