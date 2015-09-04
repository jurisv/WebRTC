/**
 * @class WebRTC.overrides.Auth
 * @override auth.controller.Auth
 *
 *  Description: The authorization package need to override the default behavior for registration and login
 *  for your specific application. There are four main methods to override:
 *
 *   Login - Register - Reset - LoginAs
 *
 *   The scope of the methods is the controller and it will contain some key pieces of data:
 *
 *   authView :
 *   The authView is the view that requested the authentication
 *
 *   success :
 *   A function that contains what to do next after successful login
 *
 *   failure:
 *   A function to run if there is a authentication failure
 *
 */
Ext.define('WebRTC.overrides.Auth', {
    override: 'auth.controller.Auth',


    register: function (data) {
        var me = this;

        debugger;

        if(data){
            var expires = new Date("October 13, 2095 11:13:00"),
                newUser = Ext.create('WebRTC.model.User', {
                    name: data.userid
                });

            Ext.util.Cookies.clear('user');
            newUser.save();
            me.authView.getViewModel().set('name', newUser.get('name'));
            me.authView.getViewModel().set('user', newUser);
            Ext.util.Cookies.set('user', JSON.stringify(newUser.data), expires);

            if (Ext.isFunction(me.onSuccess))
                me.cleanupAuth();
            me.onSuccess();
        }else{
            if (Ext.isFunction(me.onFailure))
                me.cleanupAuth();
            me.onFailure();
        }
    },

    login: function (data) {
        var me = this;

        debugger;

        if(data){
            var expires = new Date("October 13, 2095 11:13:00"),
                newUser = Ext.create('WebRTC.model.User', {
                    name: data.userid
                });

            Ext.util.Cookies.clear('user');
            newUser.save();
            me.authView.getViewModel().set('name', newUser.get('name'));
            me.authView.getViewModel().set('user', newUser);
            Ext.util.Cookies.set('user', JSON.stringify(newUser.data), expires);

            me.cleanupAuth();
            if (Ext.isFunction(me.onSuccess)){
                me.onSuccess();
            }
        }else{
            me.cleanupAuth();
            if (Ext.isFunction(me.onFailure))
                me.onFailure();
        }
    },

    reset: function (data) {
        var me = this;

        debugger;

        if(data){
            var expires = new Date("October 13, 2095 11:13:00"),
                newUser = Ext.create('WebRTC.model.User', {
                    name: data.userid
                });

            Ext.util.Cookies.clear('user');
            newUser.save();
            me.authView.getViewModel().set('name', newUser.get('name'));
            me.authView.getViewModel().set('user', newUser);
            Ext.util.Cookies.set('user', JSON.stringify(newUser.data), expires);

            me.cleanupAuth();
            if (Ext.isFunction(me.onSuccess)){
                me.onSuccess();
            }
        }else{
            me.cleanupAuth();
            if (Ext.isFunction(me.onFailure))
                me.onFailure();
        }
    },

    loginAs: function (data) {
        var me = this;

        debugger;

        if(data){
            var expires = new Date("October 13, 2095 11:13:00"),
                newUser = Ext.create('WebRTC.model.User', {
                    name: data.userid
                });

            Ext.util.Cookies.clear('user');
            newUser.save();
            me.authView.getViewModel().set('name', newUser.get('name'));
            me.authView.getViewModel().set('user', newUser);
            Ext.util.Cookies.set('user', JSON.stringify(newUser.data), expires);

            if (Ext.isFunction(me.onSuccess))
                me.cleanupAuth();
            me.onSuccess();
        }else{
            if (Ext.isFunction(me.onFailure))
                me.cleanupAuth();
            me.onFailure();
        }
    }


});
