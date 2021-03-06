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
Ext.define('WebRTC.controller.Auth', {
    extend: 'auth.controller.Auth',
    alias: 'controller.auth',

    /*
     *  The base URL for Firebase
     */
    firebaseUrl: null,

    /*
     *  A Firebase reference to the firebase client instance.
     *  The URL is given from the server.
     */
    firebaseRef: null,


    init: function(){
        var me= this;

        WebRTC.model.AdminSettings.load(0,{
            success: function(record,operation){
                if( !record.get('otApiKey') ){
                    me.fireEvent('configure');
                }else{
                    //get the firebase url and create a client instance of Firebase.
                    me.FBUrl = record.data.fbUrl;
                    me.firebaseRef =  new Firebase(me.FBUrl);
                    me.firebaseRef.onAuth(me.authDataCallback, me);
                    me.fireEvent('init');
                }
            }
        });

    },

    // starts checking for authorized users
    authorize: function () {
        var me = this,
            firebase = me.firebaseRef;

        if (me.isAuthenticating) return;
        me.isAuthenticating = true;
        me.originalRoute = window.location.hash;
    },

    // handles all the firebase callbacks for authorization regardless of provider
    authHandler: function (error, authData) {
        var me = this,
            lWindow = Ext.first('lockingwindow');

        if (error) {
            if (lWindow) {
                lWindow.updateStatus("Login Failed! " + error);
            }
            // console.log("Login Failed!", error);
            me.fireEvent('failure',error);
        } else {
            me.storeUser(authData);
            me.fireEvent('login',authData);
            me.isAuthenticating = false;
        }
    },

    // Create a callback which logs the current auth state
    authDataCallback: function (authData) {
        var me = this;

        if (authData) {
            console.log("User " + authData.uid + " is logged in with " + authData.provider);
            me.authData = authData;
            me.storeUser(authData);
            me.fireEvent('islogin',authData);
            me.cleanupAuth();
        } else {
            console.log("User is logged out");
            this.redirectTo('login');
            me.fireEvent('islogout',authData);

        }
    },


    //changes firebase email .. same userid
    changeEmail: function (btn, data) {
        var me = this,
            firebase = me.firebaseRef;

        if (data && firebase) {
            firebase.changeEmail({
                oldEmail: data.oldEmail,
                newEmail: data.newEmail,
                password: data.password
            }, function (error) {
                if (error === null) {
                    console.log("Email changed successfully");
                    btn.up('lockingwindow').updateStatus("Email changed successfully");
                } else {
                    console.log("Error changing email:", error);
                    btn.up('lockingwindow').updateStatus("Error changing email: " + error);
                }
            });
        }
        else {
            btn.up('lockingwindow').updateStatus("Unhandled error: Please let us know what happened.");
        }
    },

    //changes firebase password
    changePassword: function (btn, data) {
        var me = this,
            firebase = me.firebaseRef;

        if (data && firebase) {
            firebase.changePassword({
                email: data.email,
                oldPassword: data.oldPassword,
                newPassword: data.newPassword
            }, function (error) {
                if (error === null) {
                    console.log("Email changed successfully");
                    btn.up('lockingwindow').updateStatus("Email changed successfully");
                } else {
                    console.log("Error changing email:", error);
                    btn.up('lockingwindow').updateStatus("Error changing email: " + error);
                }
            });
        }
        else {
            btn.up('lockingwindow').updateStatus("Unhandled error: Please let us know what happened.");
        }
    },

    login: function (btn, data) {
        var me = this,
            firebase = me.firebaseRef;

        if (data && firebase) {
            firebase.authWithPassword(
                {
                    email: data.userid,
                    password: data.password
                },
                me.authHandler.bind(me)
            );
        }
    },

    loginFB: function (btn, data) {
        var me = this,
            firebase = me.firebaseRef;

        if (data && firebase) {
            firebase.authWithOAuthPopup(
                "facebook",
                me.authHandler.bind(me),
                {
                    remember: "sessionOnly",
                    scope: "email,user_likes"
                }
            );
        }
    },

    loginGitHub: function (btn, data) {
        var me = this,
            firebase = me.firebaseRef;

        if (data && firebase) {
            firebase.authWithOAuthPopup(
                "github",
                me.authHandler.bind(me),
                {
                    remember: "sessionOnly",
                    scope: "user,gist"
                }
            );
        }
    },

    logout: function () {
        var me = this,
            firebase = me.firebaseRef,
            storage = Ext.util.LocalStorage.get('userStorage');

        storage.removeItem('user');

        window.location.hash = null;
        window.location.href = window.location.pathname;

        firebase.unauth();
    },

    //send a password reset email
    reset: function (btn, data) {
        var me = this,
            firebase = me.firebaseRef;

        if (data && data.email) {
            firebase.resetPassword({
                email: data.email
            }, function (error) {
                if (error === null) {
                    console.log("Password reset email sent successfully");
                    btn.up('lockingwindow').updateStatus('Password reset email sent successfully:');

                } else {
                    console.log("Error sending password reset email:", error);
                    btn.up('lockingwindow').updateStatus('Error sending password reset email:')
                }
            });
        } else {
            btn.up('lockingwindow').updateStatus('Error with email:')
        }
    },

    //creates the new user ...
    register: function (btn, data) {
        var me = this
            storage = Ext.util.LocalStorage.get('userStorage');

        if (data) {
            var newUser = Ext.create('WebRTC.model.User', {
                    fn: data.fullName,
                    email_userid: data.email,
                    name: data.userid,
                    password: data.password
                });

            storage.removeItem('user');

            //Post to server as it has admin access to create users.
            newUser.save({
                failure: function (record, operation) {
                    var error = JSON.parse(operation.error.response.responseText),
                        message = error.message.code || 'Unable to save.';
                    btn.up('lockingwindow').updateStatus(message);
                },
                success: function (record, operation) {
                    storage.setItem('user', JSON.stringify(newUser.data));
                    me.cleanupAuth();
                    me.redirectTo('login');
                },
                callback: function (record, operation, success) {
                }
            });


        }
    },

    //deletes a firebase user
    removeUser: function (btn, data) {
        var me = this,
            firebase = me.firebaseRef;

        if (data && firebase) {
            firebase.removeUser({
                email: data.email,
                password: data.password
            }, function (error) {
                if (error === null) {
                    console.log("User removed successfully");
                    btn.up('lockingwindow').updateStatus("User removed successfully");
                } else {
                    console.log("Error removing user:", error);
                    btn.up('lockingwindow').updateStatus("Error removing user: " + error);
                }
            });
        }
        else {
            btn.up('lockingwindow').updateStatus("Unhandled error: Please let us know what happened.");
        }
    },

    // Stores the session info in the connections of the user
    startPresence: function(id){
        if(!id || this.presenceOn) return;

        var me =  this,
            firebase = me.firebaseRef,
            myConnectionsRef = firebase.child('users/' + id + '/connections'),
            lastOnlineRef = firebase.child('users/' + id + '/lastOnline'),
            connectedRef = firebase.child('/.info/connected');

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
                lastOnlineRef.onDisconnect().set(Firebase.ServerValue.TIMESTAMP);
            } else {
                console.log("not connected");
            }
        });
    },

    //set the user here in the controller and update the cookie.
    storeUser: function (authData) {
        var me = this,
            firebase = me.firebaseRef,
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

            me.startPresence(id);

            // Set the user cookie once when the app starts.
            firebase.child('/users/' + id).once("value",
                function (snapshot) {
                    var user = snapshot.val(),
                        storage = Ext.util.LocalStorage.get('userStorage');

                    if (user) {
                        storage.removeItem('user');
                        storage.setItem('user', JSON.stringify(user));
                    }
                }, function (errorObject) {
                    console.log("The read failed: " + errorObject.code);
                }
            );

            // Now setup listener to keep user info real-time
            firebase.child('/users/' + id).on("value",
                function (snapshot) {
                    var user = snapshot.val();
                    me.user =  user;
                    me.fireEvent('userData',user);
                }, function (errorObject) {
                    console.log("The read failed: " + errorObject.code);
                }
            );

        } else {
            console.log("Error getting id of an auththenication: " + errorObject.code);
        }


    },

    cleanupAuth: function(){
        var me = this,
            app = me.getApplication(),
            next = me.originalRoute || app.getDefaultToken();

        me.isAuthenticating = false;

        if(me.currentView) {
            me.currentView.destroy();
        }

        if (next) {
            me.redirectTo(next, true);
            me.originalRoute = undefined;
        }

    }

});
