Ext.define('auth.view.auth.LockScreenWindowViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.authlockscreenwindow',

    onButtonClick: function(button, e, eOpts) {        
        window.location.hash = "dashboard";
    },

    onLoginButtonClick: function(button, e, eOpts) {        
        window.location.hash = "auth.login";
    }
});
