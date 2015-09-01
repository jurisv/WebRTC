/**
 * @class soundlibrary.controller.SoundLibraryController
 * @extend Ext.app.Controller
 */
Ext.define('soundlibrary.controller.SoundLibrary', {
    extend: 'Ext.app.Controller',
    alias: 'controller.soundlibrary',

    id: 'soundlibrary',

    requires:[
        'soundlibrary.store.Sounds'
    ],

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

        Ext.create('soundlibrary.store.Sounds',{storeId:'soundlibrarySounds'});

        Ext.onReady(function(){
            Ext.create('soundlibrary.base.SoundLibrary', {
                itemId: 'soundlibrary',
                data: sound
            });
        });

    },

    _getSoundById: function (soundId) {
        var settings  = Ext.getStore('Settings'),
            sound = settings.getById(soundId),
            sounds = Ext.getStore('soundlibrarySounds'),
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
