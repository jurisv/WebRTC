/**
 * {@link Ext.Audio} is a simple class which provides a container for the
 * [HTML5 Audio element](http://developer.mozilla.org/en-US/docs/Using_HTML5_audio_and_video).
 *
 * ## Recommended File Types/Compression:
 *
 * * Uncompressed WAV and AIF audio
 * * MP3 audio
 * * AAC-LC
 * * HE-AAC audio
 */
Ext.define('Ext.media.Audio', {
    extend: 'Ext.media.Base',
    xtype : 'classic-audio',

    config: {
        /**
         * @cfg
         * @inheritdoc
         */
        cls: Ext.baseCSSPrefix + 'audio'

        /**
         * @cfg {String} url
         * The location of the audio to play.
         *
         * ### Recommended file types are:
         * * Uncompressed WAV and AIF audio
         * * MP3 audio
         * * AAC-LC
         * * HE-AAC audio
         * @accessor
         */
    },

    // @private
    onActivate: function() {
        var me = this;

        me.callParent();

        if (Ext.os.is.Phone) {
            me.element.show();
        }
    },

    // @private
    onDeactivate: function() {
        var me = this;

        me.callParent();

        if (Ext.os.is.Phone) {
            me.element.hide();
        }
    },

    template: [{
        reference: 'media',
        preload: 'auto',
        tag: 'audio',
        cls: Ext.baseCSSPrefix + 'component'
    }]
});