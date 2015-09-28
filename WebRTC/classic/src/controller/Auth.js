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
    id: 'auth',

    /*
     *  The base URL for Firebase
     */
    firebaseUrl: null,

    /*
     *  A Firebase reference to the firebase client instance.
     *  The URL is given from the server.
     */
    firebaseRef: null,

    //used to store the currect number of seconds idle
    idleTime: 0,


    init: function(){
        var me= this;

        // Add a single document event listener to handle when the user tabs away.
        if(document.addEventListener) document.addEventListener("visibilitychange", me.visibilityChanged.bind(me) );

        WebRTC.model.AdminSettings.load(0,{
            success: function(record,operation){
                if( !record.get('otApiKey') ){
                    me.fireEvent('configure');
                }else{
                    //get the firebase url and create a client instance of Firebase.
                    me.FBUrl = record.data.fbUrl;
                    me.firebaseRef =  new Firebase(me.FBUrl);
                    me.fireEvent('init');
                }
            }
        });

    },

    // this can be used to trigger timers or other events related to security
    visibilityChanged: function (){
        this.fireEvent('visibilityChanged',document.hidden);
    },


    // starts checking for authorized users
    authorize: function () {
        var me = this,
            firebase = me.firebaseRef;

        if (me.isAuthenticating) return;

        me.isAuthenticating = true;
        me.originalRoute = window.location.hash;


        // routes happen prior to the viewport loading
        // note: this needs to be rearchitected some - for now defer it..
        if(!firebase){
            Ext.Function.defer(function(){
                    me.firebaseRef.onAuth(me.authDataCallback, me);
            },
            800);
        }else{
            firebase.onAuth(me.authDataCallback, me);
        }

    },

    // handles all the firebase callbacks request to authorize regardless of provider
    //this is the yes/no with login data callback
    authHandler: function (error, authData) {
        var me = this,
            window = Ext.first('lockingwindow');

        if (error) {
            if (window) {
                window.getController().updateStatus("Login Failed! " + error);
            }
            me.fireEvent('failure',error);
        } else {

            me.initUser(authData);

            if(authData.password.isTemporaryPassword){
                me.redirectTo('newpassword');
            }else{
                me.cleanupAuth();
                me.fireEvent('login',authData);
            }

        }
    },

    // Callback which fires with any change of the current auth state
    // also fires once to determine inital login
    authDataCallback: function (authData) {
        var me = this;

        if (authData) {

            me.initUser(authData);

            if(authData.password.isTemporaryPassword){
                me.redirectTo('newpassword');
            }else{
                me.cleanupAuth();
                me.fireEvent('islogin',authData);
            }


        } else {
            // console.log("User is logged out");
            this.redirectTo('login');
            me.fireEvent('islogout');
        }
    },


    //changes firebase email .. same userid
    changeEmail: function (btn, data) {
        var me = this,
            firebase = me.firebaseRef;

        if (data && firebase) {
            firebase.changeEmail({
                oldEmail: data.email,
                newEmail: data.newemail,
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
            email = me.user['email_pref'],
            firebase = me.firebaseRef;

        if (data && firebase) {
            firebase.changePassword({
                email: email,
                oldPassword: data.password,
                newPassword: data.newpassword
            }, function (error) {
                if (error === null) {
                    console.log("Password changed successfully.");
                    btn.up('lockingwindow').getController().updateStatus("Password changed successfully.");
                    //now login with new info.
                    firebase.authWithPassword(
                        {
                            email: email,
                            password: data.newpassword
                        },
                        function(){return true;} //don't do anything
                    );
                } else {
                    console.log("Error changing passsword:", error);
                    btn.up('lockingwindow').getController().updateStatus("Error changing password: " + error);
                }
            });
        }
        else {
            btn.up('lockingwindow').getController().updateStatus("Unhandled error: Please let us know what happened.");
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
            firebase = me.firebaseRef;

        Ext.util.Cookies.clear('user');

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
                    btn.up('lockingwindow').getController().updateStatus('Password reset email sent successfully:');
                } else {
                    console.log("Error sending password reset email:", error);
                    btn.up('lockingwindow').getController().updateStatus('Error sending password reset email:');

                }
            });
        } else {
            btn.up('lockingwindow').getController().updateStatus('Error with email:')
        }
    },

    //creates the new user ...
    register: function (btn, data) {
        var me = this;

        if (data) {
            var expires = new Date("October 13, 2095 11:13:00"),
                newUser = Ext.create('WebRTC.model.User', {
                    fn: data.fullName,
                    email_userid: data.email,
                    name: data.fullName,
                    password: data.password
                });

            Ext.util.Cookies.clear('user');

            //Post to server as it has admin access to create users.
            newUser.save({
                failure: function (record, operation) {
                    var error = JSON.parse(operation.error.response.responseText),
                        message = error.message.code || 'Unable to save.';
                    btn.up('lockingwindow').getController().updateStatus(message);
                },
                success: function (record, operation) {
                    Ext.util.Cookies.set('user', JSON.stringify(newUser.data), expires);
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

    // Stores the session info in the connections of the user
    startPresence: function(id){
        if(!id || this.presenceOn) return;

        var me =  this,
            firebase = me.firebaseRef,
            myConnectionsRef = firebase.child('connections/' + id ),
            userRef = firebase.child('users/' + id),
            connectedRef = firebase.child('/.info/connected');

        this.presenceOn = true;

        me.startPresenceTimer();

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

                me.fireEvent('connected');
                me.setPresenseStatus({
                    status: 'online',
                    statusOrder: 100,
                    lastActivity: null
                });

                userRef.onDisconnect().update({
                    status: 'offline',
                    statusOrder: 0,
                    lastOnceLine: Firebase.ServerValue.TIMESTAMP,
                    lastActivity: null
                });

                // when I disconnect, update the last time I was seen online
                //lastOnlineRef.onDisconnect().set(Firebase.ServerValue.TIMESTAMP);
            } else {
                //Even though disconnected is fired, other firebase ref's can use the pattern : ref.onDisconnect().remove();
                me.fireEvent('disconnected');
                me.redirectTo('login');
                console.log("not connected");
            }
        });
    },

    startPresenceTimer: function(){
        var me = this;

        me.resetTimer = function(){
            me.fireEvent('active',Firebase.ServerValue.TIMESTAMP);
            if(me.isIdle){
                me.setPresenseStatus({
                    status: 'online',
                    statusOrder: 100,
                    lastActivity: null
                });
                me.isIdle = false;
            }
            // console.log('active');
            me.idleTime = 0;
            me.lastActivityTime = Firebase.ServerValue.TIMESTAMP;
        };

        // Increment the idle time counter every second.
        me.idleIntervalLoop = setInterval(me.onTimerIncrement, 1000, me);

        //setup inital state
        me.idleTime = 0;
        me.lastActivityTime = Firebase.ServerValue.TIMESTAMP;

        //keep idleTime at the window scope to monitor any events.
        window.onload = me.resetTimer;
        window.onclick = me.resetTimer;
        window.onmousemove = me.resetTimer;
        window.onmouseenter = me.resetTimer;
        window.onkeydown = me.resetTimer;
        window.onscroll = me.resetTimer;
        window.onmousewheel = me.resetTimer;

    },

    //timer counter and rules
    onTimerIncrement: function(me){
        me.idleTime++;
        // console.log('icrement' + window.idleTime );
        if (me.idleTime > (5 * 60) )
        {
            // console.log('idle');
            me.isIdle = true;
            me.setPresenseStatus({
                status: 'idle',
                statusOrder: 10,
                lastActivity: Firebase.ServerValue.TIMESTAMP
            });
            me.fireEvent('idle',Firebase.ServerValue.TIMESTAMP);

        }
    },

    setPresenseStatus: function(status){
        var me=this;

        if(me.user){
            var id = me.user['id'],
                usersRef = me.firebaseRef.child('users/' + id);
            usersRef.update(status);
        }
    },

    //set the user here in the controller and update the cookie.
    initUser: function (authData) {
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

            // Set the user cookie once when the app starts.
            firebase.child('/users/' + id).once("value",
                function (snapshot) {
                    var user = snapshot.val(),
                        expires = new Date("October 13, 2095 11:13:00");

                    if (user) {
                        Ext.util.Cookies.clear('user');
                        Ext.util.Cookies.set('user', JSON.stringify(user), expires);
                        Ext.first('app-main').getViewModel().set('user',user);
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
                    Ext.first('app-main').getViewModel().set('user',user);
                    Ext.first('app-main').getViewModel().set('name',user['name]']);
                    me.fireEvent('userData',user);
                    me.startPresence(id);

                }, function (errorObject) {
                    console.log("The read failed: " + errorObject.code);
                }
            );



        } else {
            console.log("Error getting id of an auththenication: " + errorObject.code);
        }


    }


});
