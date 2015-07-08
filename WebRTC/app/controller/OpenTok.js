/**
 * @class WebRTC.controller.OpenTok
 * @extend Ext.app.Controller
 */
Ext.define('Connect.controller.OpenTok', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {
            // video: 'otVideo'
        },

        control: {
            'otVideo': {
                hide: 'onVideoHide'
            }
        }

    }

});