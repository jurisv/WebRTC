Ext.define('WebRTC.view.main.ViewportController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.mainviewport',

    requires: [
        'Ext.window.Toast'
    ],

    listen: {
        controller: {
            'auth':{
                userData: 'onAuthUserData'
            }
        }
    },

    //something in the user data changed
    onAuthUserData: function(user){
        console.log('user data changed');
        this.getViewModel().set('user', user);
        this.getViewModel().set('userid', user['id']);
        this.getViewModel().set('name', user['fn']);

        Ext.StoreManager.lookup('rooms').load();
    }

});
