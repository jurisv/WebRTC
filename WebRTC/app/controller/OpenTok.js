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
                roomselect: 'onSessionCreate',
                initpublisher: 'onInitPublisher',
                chatmessage: 'onChatEmit'
            }
        }
    },
    sessions:[],
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
        var session = this.sessions.filter(function( obj ) {
            return obj.id == sessionId;
        })[0];

        return session || null;
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


    onSessionCreate: function(component, data){

        if (OT.checkSystemRequirements() != 1) {
            me.unmetRequirements();
            return false;
        }

        var me = this,
            sessionId = data.sessionId,
            publisher,
            session = me.getSessionById(sessionId);

        if(!me.sessions[data.sessionId]){

            session = OT.initSession(data.apiKey, data.sessionId);

            me.bindSessionEvents(session);

            //store the session in an array to keep the session and listeners around
            me.sessions.push(session);

            me.getConnectionToken(session, sessionId);

        }

        //set component session & connection so we can look for it later
        if(!component.sessionId){
            component.sessionId = data.sessionId; //room
        }

    },

    onSessionConnected: function(event) {
        this.fireEvent('sessionconnected',event);
    },


    getConnectionToken: function(session, sessionId){
        Ext.Ajax.request({
            url: '/data/token/' + sessionId,
            params: {
                role: 'publisher',
                name: Ext.util.Cookies.get('user')
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



    onChatEmit: function(controller,chat){
        var me= this,
            sessionId = controller.getView().sessionId,
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

    onChatReceived: function (event) {
        var from = event.from.connectionId,
            session = this.getSessionById(event.target.sessionId),
            myself = session.connection.connectionId;

        if(from != myself){
            this.fireEvent('chatreceived',event);
        }
    },

    onInitPublisher: function(controller, element){
        var me = this,
            room = controller.getViewModel().get('room'),
            sessionId = room.sessionId,
            session = me.getSessionById(sessionId);

            var publisher = OT.initPublisher(element, {
                // insertMode: 'append',
                width: '300',
                height: '200'
            });

        var movingAvg = null;
        publisher.on('audioLevelUpdated', function(event) {
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
        });


        session.publish(publisher);

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