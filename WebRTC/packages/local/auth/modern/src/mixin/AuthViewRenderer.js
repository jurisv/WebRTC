Ext.define('auth.mixin.AuthViewRenderer', {
    extend: 'Ext.Mixin',

    requires: [
        'auth.view.authentication.Login',
        
    ],

    validViews: {
        'login': { xtype: 'login' },
        'register': { xtype: 'register' }
        // 'lock': { view: 'LockScreen'},
        // 'denied': {view: 'DeniedScreen'},
        // 'newpassword': {view: 'ChangePassword'},
        // 'newemail': {view: 'ChangeEmail'},
        // 'passwordreset': {view: 'PasswordReset'}
    },

    setCurrentView: function(hashtag) {
        var me = this,
            hash = hashtag || window.location.hash.substring(1),
            view, xtype;

        if(me.currentView) {
            me.currentView.destroy();
        }

        if(hash in me.validViews) {
            xtype = me.validViews[hash].xtype;

            view = Ext.Viewport.child(xtype) || Ext.Viewport.add({xtype: xtype});

            if (view.isInnerItem()) {
                Ext.Viewport.setActiveItem(view);
            }
            else {
                view.show();
            }

            me.currentView = view;
        }
    }

        // /*
        // * Creating these autoShow modal windows will take over the screen.
        // * Switching between them is the only option until the cleanupAuth is called.
        // */
        // if(hash in me.validViews) {
        //     me.currentView = 
        //     // Ext.Viewport.add(
        //         Ext.create("auth.view.authentication."+ me.validViews[hash].view)
        //     // );
        //     Ext.Viewport.setActiveItem(me.currentView);
        // }

    // }
});
