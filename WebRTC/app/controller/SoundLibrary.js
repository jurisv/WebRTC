/**
 * @class WebRTC.controller.SoundLibraryController
 * @extend Ext.app.Controller
 */
Ext.define('WebRTC.controller.SoundLibrary', {
    extend: 'Ext.app.Controller',
    alias: 'controller.soundlibrary',

    id: 'opentok',

    refs: {
        soundLibrary: '#soundlibrary'
    },

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
        Ext.create('WebRTC.SoundLibrary', {
            itemId: 'soundlibrary'
        });
    },

    // initSounds: function(){
    //     //create the list of audio files needed for event sounds.
    //     Ext.create('WebRTC.SoundLibrary');
    // },

    onPlaysound: function(soundId,startAt,duration){
        var settings  = Ext.getStore('Settings'),
            sound = settings.getById(soundId),
            sounds = Ext.getStore('Sounds'),
            soundLibrary = this.getSoundLibrary(),
            audio;

        if (!sound || sound.get('value') === 'none') return;

        soundLibrary.setData(sounds.getById(sound.get('value')));

        audio = soundLibrary.getMedia().dom;
        if(audio){
            if(startAt){
                audio.currentTime = startAt;
            }
            // todo: this needs finishing and testing
            if(duration){
                audio.on('timeupdate', function () {
                    if (this.currentTime >= ( startAt + duration) ){
                        this.pause();
                    }
                })
            }
            audio.play();
        }
    }
});
