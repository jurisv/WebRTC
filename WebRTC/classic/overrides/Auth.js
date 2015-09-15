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

    // starts checking for authorized users
    authorize: function (request) {
        var me = this,
            viewport = Ext.first('app-main'),
            firebase = viewport.getViewModel().get('firebaseRef');

        if (me.isAuthenticating) return;

        me.isAuthenticating = true;

        me.originalRoute = window.location.hash;
        me.onSuccess = request.success;
        me.onFailure = request.failure;

        if(!firebase){
            // routes can happen prior to the viewport loading
            // note: this nees to be rearchitected some - for now defer it..
            Ext.Function.defer(function(){
                    //callback depending on login state
                    viewport.getViewModel().get('firebaseRef').onAuth(me.authDataCallback);

            },
            1200);
        }else{
            //callback depending on login state
            firebase.onAuth(me.authDataCallback);
        }
    },

    startPresence: function(id){
        if(!id || this.presenceOn) return;

        var viewport = Ext.first('app-main'),
            myConnectionsRef = viewport.getViewModel().get('firebaseRef').child('users/' + id + '/connections'),
            lastOnlineRef = viewport.getViewModel().get('firebaseRef').child('users/' + id + '/lastOnline'),
            connectedRef = viewport.getViewModel().get('firebaseRef').child('/.info/connected');

        this.presenceOn = true;

        connectedRef.on("value", function(snap) {
            if (snap.val() === true) {
                // We're connected (or reconnected)! Do anything here that should happen only if online (or on reconnect)
                // add this device to my connections list
                // this value could contain info about the device or a timestamp too
                var con = myConnectionsRef.push({
                    device: Ext.os.deviceType,
                    osName: Ext.os.name,
                    // osVersion: Ext.os.version,
                    browserName: Ext.browser.name,
                    browserVersion: Ext.browser.version,
                    online: true
                });
                // when I disconnect, remove this device
                con.onDisconnect().remove();
                // when I disconnect, update the last time I was seen online
               // lastOnlineRef.onDisconnect().set(Firebase.ServerValue.TIMESTAMP);
            } else {
                console.log("not connected");
            }
        });
    },

    register: function (btn, data) {
        var me = this;

        if (data) {
            var expires = new Date("October 13, 2095 11:13:00"),
                newUser = Ext.create('WebRTC.model.User', {
                    fn: data.fullName,
                    email_userid: data.email,
                    name: data.userid,
                    password: data.password
                });

            Ext.util.Cookies.clear('user');

            newUser.save({
                failure: function (record, operation) {
                    var error = JSON.parse(operation.error.response.responseText),
                        message = error.message.code || 'Unable to save.';
                    btn.up('lockingwindow').getController().updateStatus(message);
                },
                success: function (record, operation) {
                    var viewport = Ext.first('app-main');
                    viewport.getViewModel().set('name', newUser.get('fn'));
                    viewport.getViewModel().set('user', newUser);
                    Ext.util.Cookies.set('user', JSON.stringify(newUser.data), expires);

                    me.cleanupAuth();
                    if (Ext.isFunction(me.onSuccess))
                        me.onSuccess();

                },
                callback: function (record, operation, success) {
                }
            });


        } else {
            me.cleanupAuth();
            if (Ext.isFunction(me.onFailure))
                me.onFailure();
        }
    },

    login: function (btn, data) {
        var me = this,
            viewport = Ext.first('app-main'),
            firebase = viewport.getViewModel().get('firebaseRef');
        if (data && firebase) {
            firebase.authWithPassword(
                {
                    email: data.userid,
                    password: data.password
                },
                me.authHandler
            );
        }
        else {
            me.cleanupAuth();
            if (Ext.isFunction(me.onFailure))
                me.onFailure();
        }
    },

    loginFB: function (btn, data) {
        var me = this,
            viewport = Ext.first('app-main'),
            firebase = viewport.getViewModel().get('firebaseRef');
        if (data && firebase) {
            firebase.authWithOAuthPopup(
                "facebook",
                me.authHandler,
                {
                    remember: "sessionOnly",
                    scope: "email,user_likes"
                }
            );
        }
        else {
            me.cleanupAuth();
            if (Ext.isFunction(me.onFailure))
                me.onFailure();
        }
    },

    loginGitHub: function (btn, data) {
        var me = this,
            viewport = Ext.first('app-main'),
            firebase = viewport.getViewModel().get('firebaseRef');
        if (data && firebase) {
            firebase.authWithOAuthPopup(
                "github",
                me.authHandler,
                {
                    remember: "sessionOnly",
                    scope: "user,gist"
                }
            );
        }
        else {
            me.cleanupAuth();
            if (Ext.isFunction(me.onFailure))
                me.onFailure();
        }
    },

    logout: function () {
        var me = this,
            viewport = Ext.first('app-main'),
            firebase = viewport.getViewModel().get('firebaseRef');

        Ext.util.Cookies.clear('user');

        window.location.hash = null;
        window.location.href = window.location.pathname;

        firebase.unauth();
    },

    //send a password reset email
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

    //changes firebase email .. same userid
    changeEmail: function (btn, data) {
        var me = this,
            viewport = Ext.first('app-main'),
            firebase = viewport.getViewModel().get('firebaseRef');
        if (data && firebase) {
            firebase.changeEmail({
                oldEmail: data.oldEmail,
                newEmail: data.newEmail,
                password: data.password
            }, function (error) {
                if (error === null) {
                    console.log("Email changed successfully");
                    btn.up('lockingwindow').getController().updateStatus("Email changed successfully");
                } else {
                    console.log("Error changing email:", error);
                    btn.up('lockingwindow').getController().updateStatus("Error changing email: " + error);
                }
            });
        }
        else {
            btn.up('lockingwindow').getController().updateStatus("Unhandled error: Please let us know what happened.");
        }
    },

    //changes firebase password
    changePassword: function (btn, data) {
        var me = this,
            viewport = Ext.first('app-main'),
            firebase = viewport.getViewModel().get('firebaseRef');
        if (data && firebase) {
            firebase.changePassword({
                email: data.email,
                oldPassword: data.oldPassword,
                newPassword: data.newPassword
            }, function (error) {
                if (error === null) {
                    console.log("Email changed successfully");
                    btn.up('lockingwindow').getController().updateStatus("Email changed successfully");
                } else {
                    console.log("Error changing email:", error);
                    btn.up('lockingwindow').getController().updateStatus("Error changing email: " + error);
                }
            });
        }
        else {
            btn.up('lockingwindow').getController().updateStatus("Unhandled error: Please let us know what happened.");
        }
    },

    //deletes a firebase user
    removeUser: function (btn, data) {
        var me = this,
            viewport = Ext.first('app-main'),
            firebase = viewport.getViewModel().get('firebaseRef');
        if (data && firebase) {
            firebase.removeUser({
                email: data.email,
                password: data.password
            }, function (error) {
                if (error === null) {
                    console.log("User removed successfully");
                    btn.up('lockingwindow').getController().updateStatus("User removed successfully");
                } else {
                    console.log("Error removing user:", error);
                    btn.up('lockingwindow').getController().updateStatus("Error removing user: " + error);
                }
            });
        }
        else {
            btn.up('lockingwindow').getController().updateStatus("Unhandled error: Please let us know what happened.");
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
            controller = WebRTC.app.getController('auth.controller.Auth');

        if (authData) {
            console.log("User " + authData.uid + " is logged in with " + authData.provider);
            viewport.getViewModel().data.authData = authData;
            controller.storeUser(authData);

        } else {
            console.log("User is logged out");
            controller.redirectTo('login');
        }
    },

    //set the user on the viewModel and updates the cookie.
    storeUser: function (authData) {
        var controller = WebRTC.app.getController('auth.controller.Auth'),
            viewport = Ext.first('app-main'),
            firebase = viewport.getViewModel().get('firebaseRef'),
            id;

        if (authData.provider) {
            switch (authData.provider) {
                case 'password':
                    id = authData.uid;
                    break;
                case 'github':
                    id = authData.id;
            }
        }

        if (id) {

            controller.startPresence(id);

            // Only load and set the user cookie once when the app starts.
            firebase.child('/users/' + id).once("value",
                function (snapshot) {

                    var user = snapshot.val(),
                        expires = new Date("October 13, 2095 11:13:00");

                    if (user) {
                        Ext.util.Cookies.clear('user');

                        viewport.getViewModel().set('userid', user['id']);
                        viewport.getViewModel().set('name', user['fn']);
                        viewport.getViewModel().set('user', user);

                        Ext.util.Cookies.set('user', JSON.stringify(user), expires);
                        controller.cleanupAuth();
                        controller.syncStores();

                        if (Ext.isFunction(controller.onSuccess)) {
                            controller.onSuccess();
                        }
                    }

                    // console.log( 'I got back:'+ snapshot.val());
                }, function (errorObject) {
                    console.log("The read failed: " + errorObject.code);
                });
        } else {

        }


    },

    // Re-load specific stores that have filters that are based on rules of the current user.
    // This needs to be done after authentication as the viewModels load much earlier.
    syncStores: function(){
        Ext.StoreManager.lookup('rooms').load();
    }
});
