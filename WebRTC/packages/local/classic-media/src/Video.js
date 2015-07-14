/**
 * @aside example video
 * Provides a simple Container for HTML5 Video.
 *
 * ## Notes
 *
 * - There are quite a few issues with the '<video>' tag on Android devices. On Android 2+, the video will
 * appear and play on first attempt, but any attempt afterwards will not work.
 *
 * - Video and Audio tags are not supported by IE8. If you are targetiing this version of IE we suggest to use
 * Flash player alternatives.
 *
 *
 * ## Useful Properties
 *
 * - {@link #url}
 * - {@link #autoPause}
 * - {@link #autoResume}
 *
 * ## Useful Methods
 *
 * - {@link #method-pause}
 * - {@link #method-play}
 * - {@link #toggle}
 *
 * ## Example
 *
 *     var panel = Ext.create('Ext.Panel', {
 *         fullscreen: true,
 *         items: [
 *             {
 *                 xtype    : 'classic-video',
 *                 width    : 1280,
 *                 height   : 720,
 *                 url      : ['Wildlife-720p.mp4','Wildlife-720p.webm','Wildlife-720p.ogv'],
 *                 posterUrl: 'Wildlife.jpg'
 *             }
 *         ]
 *     });
 */
Ext.define('Ext.media.Video', {
    extend: 'Ext.media.Base',
    xtype: 'classic-video',

    config: {
        /**
         * @cfg {String/Array} url
         * Location of the video to play. Supported formats include H.264 (mp4), OGG Vorbis Theora and WebM vp8 Vorbis codecs
         * @accessor
         */

        /**
         * @cfg {String} posterUrl
         * Location of a poster image to be shown before showing the video.
         * @accessor
         */
        posterUrl: null,

        /**
         * @cfg
         * @inheritdoc
         */
        baseCls: Ext.baseCSSPrefix + 'video',

        /**
         * @cfg {Boolean} controls
         * Determines if native controls should be shown for this video player.
         */
        controls: true
    },

    codecs:{
        mp4: 'video/mp4; codecs="avc1.4D401E, mp4a.40.2"',
        ogv: 'video/ogg; codecs="theora, vorbis"',
        webm: 'video/webm; codecs="vp8.0, vorbis"'
    },

    template: [{
        /**
         * @property {Ext.dom.Element} ghost
         * @private
         */
        reference: 'ghost',
        classList: [Ext.baseCSSPrefix + 'video-ghost']
    }, {
        tag: 'video',
        reference: 'media',
        classList: [Ext.baseCSSPrefix + 'media']
    }],

    constructor: function() {
        var me = this;

        me.callParent(arguments);

        me.ghost.enableDisplayMode();

        me.media.hide();

        me.onBefore({
            erased: 'onErased',
            scope: me
        });

        me.ghost.on({
            tap: 'onGhostTap',
            scope: me
        });

        me.media.on({
            pause: 'onPause',
            scope: me
        });

        if (Ext.os.is.Android4 || Ext.os.is.iPad) {
            this.isInlineVideo = true;
        }
    },

    applyUrl: function(url) {
        return [].concat(url);
    },

    updateUrl: function(newUrl) {
        var me = this,
            media = me.media,
            newLn = newUrl.length,
            existingSources = media.query('source'),
            oldLn = existingSources.length,
            i;


        for (i = 0; i < oldLn; i++) {
            Ext.fly(existingSources[i]).destroy();
        }

        for (i = 0; i < newLn; i++) {

            media.appendChild(Ext.Element.create({
                tag: 'source',
                type: me.codecs[newUrl[i].split('.')[1]],
                src: newUrl[i]
            }));
        }

        if (me.isPlaying()) {
            me.play();
        }
    },

    updateControls: function(value) {
        this.media.set({controls:value ? true : undefined});
    },

    onErased: function() {
        this.pause();
        this.media.setTop(-2000);
        this.ghost.show();
    },

    /**
     * @private
     * Called when the {@link #ghost} element is tapped.
     */
    onGhostTap: function() {

        var me = this,
            media = this.media,
            ghost = this.ghost;


        if (Ext.browser.is.AndroidStock2) {
            setTimeout(function() {
                me.play();
                setTimeout(function() {
                    media.hide();
                }, 10);
            }, 10);
        } else {
            // Browsers which support native video tag display only, move the media down so
            // we can control the Viewport
            ghost.hide();
            me.play();
        }
        media.show();
    },

    /**
     * @private
     * native video tag display only, move the media down so we can control the Viewport
     */
    onPause: function() {
        this.callParent(arguments);
        if (!this.isInlineVideo) {
            this.media.setTop(-2000);
        }
    },

    /**
     * @private
     * native video tag display only, move the media down so we can control the Viewport
     */
    onPlay: function() {
        this.ghost.hide();
        this.callParent(arguments);
        this.media.setTop(0);
    },

    /**
     * Updates the URL to the poster, even if it is rendered.
     * @param {Object} newUrl
     */
    updatePosterUrl: function(newUrl) {
        var ghost = this.ghost;
        if (ghost) {
            ghost.setStyle('background-image', 'url(' + newUrl + ')');
        }
    }
});