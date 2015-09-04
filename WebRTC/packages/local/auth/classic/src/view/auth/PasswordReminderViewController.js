Ext.define('auth.view.auth.PasswordReminderViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.authpasswordreminder',

    onButtonClick: function(button, e, eOpts) {        
        window.location.hash = "dashboard";
    },

    onLoginButtonClick: function(button, e, eOpts) {        
        window.location.hash="auth.login"
    }
});
