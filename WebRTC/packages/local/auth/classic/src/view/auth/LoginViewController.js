Ext.define('auth.view.auth.LoginViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.authlogin',

    init: function(){
        var me=this,
            title = me.getViewModel().get('appTitle') || 'Login';
        this.getView().setTitle(title);
    },

    onLoginButtonClick: function(button, e, eOpts) {
        window.location.hash = "auth.login";
    },

    onLoginFBButtonClick: function(button, e, eOpts) {
        window.location.hash = "auth.loginFB";
    },

    onRegisterButtonClick: function(button, e, eOpts) {
        window.location.hash = "auth.register";
    }

});
