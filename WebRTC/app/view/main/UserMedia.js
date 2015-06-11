/**
 * This view is an example video stream.
 */
Ext.define('WebRTC.view.main.UserMedia', {
    extend: 'Ext.Component',
    xtype: 'UserMedia',
    cls: 'gum-local',

    constraints: {
      audio: false,
      video: true
    },

    /* style: {
        color: '#FFFFFF',
        backgroundColor:'#222'
    },*/

    /*  template: [{
        tag: 'video'
    }],
    */

    html: '<video autoplay></video>',

    successCallback: function (component, stream) {

        var video = document.querySelector('#' + component.id + ' video');

        window.stream = stream; // stream available to console
        if (window.URL) {
        video.src = window.URL.createObjectURL(stream);
        } else {
        video.src = stream;
        }
    },

    errorCallback: function(error) {
        console.log('navigator.getUserMedia error: ', error);
    },

    doGetUserMedia: function(){
            var me=this;
            navigator.getUserMedia(me.constraints, function(stream){me.successCallback(me,stream)}, this.errorCallback);
    },

    listeners: {
        // show: function(){this.doGetUserMedia()},  //classic
        // initialize: function(){this.doGetUserMedia()}   //modern
    }
});
