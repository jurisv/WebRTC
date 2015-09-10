Ext.define('auth.view.authentication.AuthenticationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.authentication',


    onFaceBookLogin : function(btn) {
        this.fireEvent('loginFB', btn, this.getViewModel()['data'] );
    },

    onLoginButton: function(btn) {
        this.fireEvent('login', btn,  this.getViewModel()['data'] );
    },

    onLoginAsButton: function(btn) {
        this.fireEvent('loginAs', btn,  this.getViewModel()['data'] );
    },

    onNewAccount:  function(btn) {
        this.redirectTo('register', btn,  true);
    },

    onSignupClick:  function(btn) {
        this.fireEvent('register', btn, this.getViewModel()['data'] );
    },

    onResetClick:  function(btn) {
        this.fireEvent('reset', btn, this.getViewModel()['data'] );
    }
});