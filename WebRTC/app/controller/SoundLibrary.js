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
        var sound = this._getSoundById('chat-sound');

        Ext.onReady(function(){
            Ext.create('WebRTC.SoundLibrary', {
                itemId: 'soundlibrary',
                data: sound
            });
        });

    },

    _getSoundById: function (soundId) {
        var settings  = Ext.getStore('Settings'),
            sound = settings.getById(soundId),
            sounds = Ext.getStore('Sounds'),
            value;

            if (sound) {
                value = sound.get('value')
            }

            return (value && value !== "none") ? sounds.getById(value) : undefined;
    },


    onPlaysound: function(soundId,startAt,duration){
        var sound = this._getSoundById(soundId),
            soundLibrary = this.getSoundLibrary(),
            audio;

        if (!sound) return;

        soundLibrary.setData(sound.data);

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
