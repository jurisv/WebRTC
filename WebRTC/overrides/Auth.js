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
            viewport = Ext.first('app-main'),
            firebase = viewport.getViewModel().get('firebaseRef');
        if (data && firebase) {

            firebase.authWithPassword({
                email    : data.userid,
                password : data.password
            }, function(error, authData) {
                if (error) {
                    console.log("Login Failed!", error);
                    me.cleanupAuth();
                    if (Ext.isFunction(me.onFailure))
                        me.onFailure();
                } else {
                    // console.log("Authenticated successfully with payload:", authData);

                    viewport.getViewModel().data.authData = authData;

                    firebase.child('/users/' + authData.uid).on("value",
                        function (snapshot) {

                            var user = snapshot.val(),
                                expires = new Date("October 13, 2095 11:13:00");

                            Ext.util.Cookies.clear('user');

                            viewport.getViewModel().set('name', user.fn);
                            viewport.getViewModel().set('user', user);
                            Ext.util.Cookies.set('user', JSON.stringify(user), expires);
                            me.cleanupAuth();
                            if (Ext.isFunction(me.onSuccess)) {
                                me.onSuccess();
                            }

                           // console.log( 'I got back:'+ snapshot.val());
                        }, function (errorObject) {
                            console.log("The read failed: " + errorObject.code);
                        });
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
