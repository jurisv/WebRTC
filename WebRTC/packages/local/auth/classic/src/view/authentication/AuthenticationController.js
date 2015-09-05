Ext.define('auth.view.authentication.AuthenticationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.authentication',


    onFaceBookLogin : function() {
        //TODO: implement central Facebook OATH handling here
        this.fireEvent('loginFB', this.getViewModel()['data'] );
    },

    onLoginButton: function() {
        this.fireEvent('login', this.getViewModel()['data'] );
    },

    onLoginAsButton: function() {
        this.fireEvent('loginAs', this.getViewModel()['data'] );
    },

    onNewAccount:  function() {
        this.redirectTo('register', true);
    },

    onSignupClick:  function() {
        this.fireEvent('register', this.getViewModel()['data'] );
    },

    onResetClick:  function() {
        this.fireEvent('reset', this.getViewModel()['data'] );
    }
});