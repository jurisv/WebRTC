/**
 * @class WebRTC.controller.SoundLibraryController
 * @extend Ext.app.Controller
 */
Ext.define('WebRTC.controller.SoundLibrary', {
    extend: 'Ext.app.Controller',
    alias: 'controller.soundlibrary',
    id: 'opentok',
    listen: {
        controller: {
            '*': {
                   playsound: 'onPlaysound'
            },
            component:{
                '*':{
                    playsound: 'onPlaysound'
                }
            }
        }
    },

    init: function(){
        //create the list of audio files needed for event sounds.
        Ext.create('WebRTC.SoundLibrary');
    },

    initSounds: function(){
        //create the list of audio files needed for event sounds.
        Ext.create('WebRTC.SoundLibrary');
    },

    onPlaysound: function(sound,startAt,duration){
        var audio = Ext.getElementById('x-soundlibrary-' + sound);
        if(audio){
            if(startAt){
                audio.currentTime = startAt;
            }
            if(duration){
               //  audio.currentTime = startAt;
            }
            audio.play();
        }
    }
});