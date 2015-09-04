Ext.define('auth.view.auth.RegisterViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.authregister',

    onButtonClick: function(button, e, eOpts) {        
        window.location.hash = "dashboard";
    },

    onLogFacebookButtonClick: function(button, e, eOpts) {        
        window.location.hash = "dashboard";
    },

    onLoginButtonClick: function(button, e, eOpts) {       
        window.location.hash = "auth.login";
    }

});
