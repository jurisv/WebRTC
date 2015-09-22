/**
 * @class auth.controller.Auth
 * @extend Ext.app.Controller
 *
 *
 */
Ext.define('auth.controller.Auth', {
    extend: 'Ext.app.Controller',
    id: 'auth',

    requires: [
        'auth.view.authentication.Register'
    ],

    mixins: ['auth.mixin.AuthViewRenderer'],

    routes : {
        'passwordreset' : {
             action  : 'setCurrentView'
        },
        'login' : {
            action  : 'setCurrentView'
        },
        'register' : {
            action  : 'setCurrentView'
        },
        'lock' : {
            action  : 'setCurrentView'
        },
        'denied' : {
            action  : 'setCurrentView'
        },
        'newemail' : {
            action  : 'setCurrentView'
        },
        'newpassword' : {
            action  : 'setCurrentView'
        }
    },

    listen: {
        /*
         * Any controller that fires authorize needs us to handle it and then run the next steps
         * passed in to the request.
         */
        controller: {
            '*': {
                authorize: 'authorize',
                logout: 'logout'
            },
            'authentication': {
                login: 'login',
                loginFB: 'loginFB',
                loginGitHub: 'loginGitHub',
                loginAs: 'loginAs',
                changePassword: 'changePassword',
                changeEmail: 'changeEmail',
                removeUser: 'removeUser',
                reset: 'reset',
                register: 'register',
                done: 'cleanupAuth'
            }
        }
    },


    /*
    * used to manage state for routes while authenticating
    */
    isAuthenticating: false,

    /*
     * the original route prior to auth changes
     */
    originalRoute: null,


    /*
     * the currently showing authorization view
     */
    currentView: null,

    /*
     * a function passed into the request on run after success
     */
    onSuccess: Ext.emptyFn,

    /*
     * a function passed into the request on run after failure
     */
    onFailure: Ext.emptyFn,

    /*
     * Authenticated User
     */
    user: null,




    cleanupAuth: function(callback){
        var me = this;
        me.isAuthenticating = false;

        if(me.currentView) {
            me.currentView.destroy();
        }

        me.redirectTo(me.originalRoute || '');
        me.originalRoute = null;
    },


    /*
    *
    *   THESE ARE STUB FUNCTIONS THAT SHOULD BE OVERRIDDEN BY YOUR APPLICATION LOGIC
    *
    */

    authorize: function(request){
        var me = this;

        if(me.isAuthenticating) return;

        me.isAuthenticating = true;
        me.originalRoute = window.location.hash;
        me.onSuccess = request.success;
        me.onFailure = request.failure;

        me.redirectTo('login');

    },

    changeEmail: function(btn,data){

    },

    changePassword: function(btn,data){

    },

    removeUser: function(btn,data){

    },

    logout: function(btn,data){

    },

    login: function(btn,data){
        /*
         * Stub function meant to be overridden by application specific logic
         */
        var me = this;

        /*
         * Dummy logic tests for data and succeeds otherwise fails
         *
         */
        me.cleanupAuth();
        if(data){
            if (Ext.isFunction(me.onSuccess))
                me.onSuccess();
        }else{
            if (Ext.isFunction(me.onFailure))
                me.onFailure();
        }
    },

    loginFB: function(btn,data){
        /*
         * Stub function meant to be overridden by application specific logic
         */
        var me = this;

        /*
         * Dummy logic tests for data and succeeds otherwise fails
         *
         */
        me.cleanupAuth();
        if(data){
            if (Ext.isFunction(me.onSuccess))
                me.onSuccess();
        }else{
            if (Ext.isFunction(me.onFailure))
                me.onFailure();
        }
    },

    loginGitHub: function(btn,data){
        /*
         * Stub function meant to be overridden by application specific logic
         */
        var me = this;

        /*
         * Dummy logic tests for data and succeeds otherwise fails
         *
         */
        me.cleanupAuth();
        if(data){
            if (Ext.isFunction(me.onSuccess))
                me.onSuccess();
        }else{
            if (Ext.isFunction(me.onFailure))
                me.onFailure();
        }
    },

    loginAs: function(btn,data){
        /*
         * Stub function meant to be overridden by application specific logic
         */
        var me = this;

        /*
         * Dummy logic tests for data and succeeds otherwise fails
         *
         */
        me.cleanupAuth();
        if(data){
            if (Ext.isFunction(me.onSuccess))
                me.onSuccess();
        }else{
            if (Ext.isFunction(me.onFailure))
                me.onFailure();
        }
    },

    reset: function(btn,data){
        /*
         * Stub function meant to be overridden by application specific logic
         */
        var me = this;

        /*
         * Dummy logic tests for data and succeeds otherwise fails
         *
         */
        me.cleanupAuth();
        if(data){
            if (Ext.isFunction(me.onSuccess))
                me.onSuccess();
        }else{
            if (Ext.isFunction(me.onFailure))
                me.onFailure();
        }
    },

    register: function(btn,data){
        /*
         * Stub function meant to be overridden by application specific logic
         */
        var me = this;

        /*
         * Dummy logic tests for data and succeeds otherwise fails
         *
         */
        me.cleanupAuth();
        if(data){
            if (Ext.isFunction(me.onSuccess))
                me.onSuccess();
        }else{
            if (Ext.isFunction(me.onFailure))
                me.onFailure();
        }
    }
});