Ext.define('WebRTC.controller.Auth', {
    extend: 'auth.controller.Auth',


    authorize: function(request){
        var me = this,
            viewport = Ext.first('app-main'),
            firebase = viewport.getViewModel().get('firebaseRef');

        if(me.isAuthenticating) return;

        me.isAuthenticating = true;

        me.originalRoute = window.location.hash;
        me.onSuccess = request.success;
        me.onFailure = request.failure;

        //callback depending on login state
        firebase.onAuth(me.authDataCallback);
    },


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
            }, me.authHandler);
        }
        else{
            me.cleanupAuth();
            if (Ext.isFunction(me.onFailure))
                me.onFailure();
        }
    },

    loginFB: function(btn,data){
        var me = this,
            viewport = Ext.first('app-main'),
            firebase = viewport.getViewModel().get('firebaseRef');
        if (data && firebase) {
            firebase.authWithOAuthPopup("facebook", me.authHandler);
        }
        else{
            me.cleanupAuth();
            if (Ext.isFunction(me.onFailure))
                me.onFailure();
        }
    },

    logout: function(){
        var me = this,
            viewport = Ext.first('app-main'),
            firebase = viewport.getViewModel().get('firebaseRef'),
            storage = Ext.util.LocalStorage.get('userStorage');

        storage.removeItem('user');
        window.location.hash = null;
        window.location.href = window.location.pathname;

        firebase.unauth();
    },

    reset: function (btn, data) {
        var me = this,
            viewport = Ext.first('app-main'),
            firebase = viewport.getViewModel().get('firebaseRef');

        if (data && data.email) {
            firebase.resetPassword({
                email: data.email
            }, function (error) {
                if (error === null) {
                    console.log("Password reset email sent successfully");
                    btn.up('lockingwindow').getController().updateStatus('Password reset email sent successfully:');

                } else {
                    console.log("Error sending password reset email:", error);
                    btn.up('lockingwindow').getController().updateStatus('Error sending password reset email:')
                }
            });
        } else {
            btn.up('lockingwindow').getController().updateStatus('Error with email:')
        }
    },

    // handles all the firebase callbacks for authorization regardless of provider
    authHandler: function (error, authData) {
        var controller = WebRTC.app.getController('auth.controller.Auth'),
            viewport = Ext.first('app-main'),
            window = Ext.first('lockingwindow'),
            firebase = viewport.getViewModel().get('firebaseRef');



        if (error) {
            if (window) {
                window.getController().updateStatus("Login Failed! " + error);
            }
            console.log("Login Failed!", error);
            if (Ext.isFunction(controller.onFailure))
                controller.onFailure();
        } else {
            controller.storeUser(authData);
        }
    },

    // Create a callback which logs the current auth state
    authDataCallback: function (authData) {
        var viewport = Ext.first('app-main'),
            controller = WebRTC.app.getController('Auth');

        if (authData) {
            console.log("User " + authData.uid + " is logged in with " + authData.provider);
            viewport.getViewModel().data.authData = authData;
            controller.storeUser(authData.uid);

        } else {
            console.log("User is logged out");
            controller.redirectTo('login', true);
        }
    },

    //set the user on the viewModel and updates the cookie.
    storeUser: function(id){
        var controller = WebRTC.app.getController('Auth'),
            viewport = Ext.first('app-main'),
            firebase = viewport.getViewModel().get('firebaseRef'),
            storage = Ext.util.LocalStorage.get('userStorage');

        firebase.child('/users/'+ id).on("value",
            function (snapshot) {

                var user = snapshot.val(),
                    expires = new Date("October 13, 2095 11:13:00");

                // Ext.util.Cookies.clear('user');
                storage.removeItem('user');


                viewport.getViewModel().set('name', user.fn);
                viewport.getViewModel().set('user', user);

                // Ext.util.Cookies.set('user', JSON.stringify(user), expires);
                storage.setItem('user', JSON.stringify(user));
                controller.cleanupAuth();

                if (Ext.isFunction(controller.onSuccess)) {
                    controller.onSuccess();
                }

                // console.log( 'I got back:'+ snapshot.val());
            }, function (errorObject) {
                console.log("The read failed: " + errorObject.code);
            });

    }    
});
