Ext.define('WebRTC.view.videoroom.VideoRoomController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.videoroom',



    manageOTSession: function(){
        var me = this,
         pubDiv = me.getView().down('#publisher').id,
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
                me.getViewModel().set('otSession', OT.initSession(openTok.sessionId) );
                me.getViewModel().set('otPublisher',OT.initPublisher(openTok.apiKey, pubDiv, {
                        //insertMode: 'append',
                        width: 400,
                        height: 300
                    })
                );
                me.bindSessionEvents(me.getViewModel().get('otSession'));

                me.getViewModel().get('otSession').connect(openTok.apiKey, openTok.token);
            }

        }
    },

    bindSessionEvents: function(session){
        var me= this,
            publisher = me.getViewModel().get('otPublisher');

        session.on({
            // streamCreated: Ext.bind(me.onStreamCreated,me),
            // streamDestroyed: Ext.bind(me.onStreamDestroyed,me),
            // This function runs when another client publishes a stream (eg. session.publish())
            streamCreated: function(event) {
                // Create a container for a new Subscriber, assign it an id using the streamId, put it inside
                // the element with id="subscribers"

                var subDiv = me.getView().down('#subscribers').id;

                console.log('stream created');

                var subContainer = document.createElement('div');
                subContainer.id = 'stream-' + event.stream.streamId;
                document.getElementById(subDiv).appendChild(subContainer);

                // Subscribe to the stream that caused this event, put it inside the container we just made
                session.subscribe(event.stream, subContainer);
            },
            onStreamDestroyed: function(event){
                console.log('stream destroyed');
            },
            // This function runs when session.connect() asynchronously completes
            sessionConnected: function(event) {
                // Publish the publisher we initialzed earlier (this will trigger 'streamCreated' on other
                // clients)
                console.log('session connected');
                session.publish(publisher);
            }
        });
    },


    onRoomHide: function(){
        var me = this,
            session = me.getViewModel().get('otSession');

       // me.stopPublishing();

    },

    onRoomShow: function() {
         var me = this;
         if(!me.getViewModel().get('otSession')){
             me.manageOTSession();
         }
    }
});