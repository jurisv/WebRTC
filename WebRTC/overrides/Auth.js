/**
 * @class WebRTC.overrides.Auth
 * @override auth.controller.Auth
 *
 *  Description: The authorization package need to override the default behavior for registration and login
 *  for your specific application. There are four main methods to override:
 *
 *   Login - Register - Reset - LoginAs
 *
 *   The scope of each method is the auth controller and it will contain some key pieces of data:
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


    register: function (btn,data) {
        var me = this;

        if(data){
            var expires = new Date("October 13, 2095 11:13:00"),
                newUser = Ext.create('WebRTC.model.User', {
                    fn: data.fullName,
                    email_userid: data.email,
                    name: data.userid,
                    password: data.password
                });

            Ext.util.Cookies.clear('user');
            newUser.save({
                failure: function(record, operation) {
                    var error = JSON.parse(operation.error.response.responseText),
                        label = btn.up('form').down('label[reference=errorLabel]');
                    label.setText(error);
                    label.show();
                },
                success: function(record, operation) {
                    var viewport = Ext.first('app-main');
                    viewport.getViewModel().set('name', newUser.get('fn'));
                    viewport.getViewModel().set('user', newUser);
                    Ext.util.Cookies.set('user', JSON.stringify(newUser.data), expires);

                    if (Ext.isFunction(me.onSuccess))
                        me.cleanupAuth();
                    me.onSuccess();

                },
                callback: function(record, operation, success) {
                }
            });


        }else{
            if (Ext.isFunction(me.onFailure))
                me.cleanupAuth();
            me.onFailure();
        }
    },

    login: function (btn,data) {
        var me = this,
            viewport = Ext.first('app-main');
        if (data) {

            Ext.Ajax.request({
                url: 'data/login',
                params: data,
                success: function (response, opts) {
                    var obj = Ext.decode(response.responseText);
                    if(obj.data && obj.data[0]){
                        var uid = obj.data[0],
                            expires = new Date("October 13, 2095 11:13:00");

                        WebRTC.model.User.load(uid,{
                            success: function(record,operation){
                                Ext.util.Cookies.clear('user');
                                viewport.getViewModel().set('name', record.get('name'));
                                viewport.getViewModel().set('user', record);
                                Ext.util.Cookies.set('user', JSON.stringify(record.data), expires);
                                me.cleanupAuth();
                                if (Ext.isFunction(me.onSuccess)) {
                                    me.onSuccess();
                                }
                            }
                        });

                    }
                },

                failure: function (response, opts) {
                    console.log('server-side failure with status code ' + response.status);
                }
            });
        }
        else{
                me.cleanupAuth();
                if (Ext.isFunction(me.onFailure))
                    me.onFailure();
        }
    },
    reset: function (btn,data) {
        var me = this;


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

    loginAs: function (btn,data) {
        var me = this;


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
