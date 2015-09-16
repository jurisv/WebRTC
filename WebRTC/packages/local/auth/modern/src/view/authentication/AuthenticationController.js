Ext.define('auth.view.authentication.AuthenticationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.authentication',

    updateStatus: function(text){
       var statusLabel =  this.getView().down('[reference=statusLabel]');
       if(statusLabel){
           statusLabel.setHtml(text);
           statusLabel.show();
       }
    },

    onNewEmail:  function(btn) {
        this.redirectTo('newemail', btn,  true);
    },

    onChangeEmail:  function(btn) {
        this.fireEvent('changeEmail', btn, this.getViewModel()['data'] );
    },

    onNewPassword:  function(btn) {
        this.redirectTo('newpassword', btn,  true);
    },

    onChangePassword:  function(btn) {
        this.fireEvent('changePassword', btn, this.getViewModel()['data'] );
    },

    onFaceBookLogin : function(btn) {
        this.fireEvent('loginFB', btn, this.getViewModel()['data'] );
    },

    onGitHubLogin : function(btn) {
        this.fireEvent('loginGitHub', btn, this.getViewModel()['data'] );
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