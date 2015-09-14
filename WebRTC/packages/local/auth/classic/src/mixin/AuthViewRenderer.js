Ext.define('auth.mixin.AuthViewRenderer', {
    extend: 'Ext.Mixin',

    validViews: {
        'login': {view: 'Login'},
        'register': {view: 'Register'},
        'lock': {view: 'LockScreen'},
        'denied': {view: 'DeniedScreen'},
        'newpassword': {view: 'ChangePassword'},
        'newemail': {view: 'ChangeEmail'},
        'passwordreset': {view: 'PasswordReset'}
    },

    setCurrentView: function(hashtag, is_popup) {
        var me=this,
            hash = hashtag || window.location.hash.substring(1);

        if(me.currentView) {
            me.currentView.destroy();
        }

        /*
        * Creating these autoShow modal windows will take over the screen.
        * Switching between them is the only option until the cleanupAuth is called.
        */
        if(hash in me.validViews) {
            me.currentView = Ext.create("auth.view.authentication."+ me.validViews[hash].view);
        }

    }
})