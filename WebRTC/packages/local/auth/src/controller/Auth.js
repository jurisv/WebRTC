/**
 * @class auth.controller.Auth
 * @extend Ext.app.Controller
 */
Ext.define('auth.controller.Auth', {
    extend: 'Ext.app.Controller',
    id: 'auth',

    routes : {
        'auth.PasswordReminder' : {
            before  : 'onRouteBeforePasswordReminder',
            action  : 'onRoutePasswordReminder'
        },
        'auth.login' : {
            before  : 'onRouteBeforeLogin',
            action  : 'onRouteLogin'
        },
        'auth.register' : {
            before  : 'onRouteBeforeRegister',
            action  : 'onRouteRegister'
        }
    },

    listen: {
        controller: {
            '*': {
                authorize: 'onAuthorize'
            }
        }
    },

    onAuthorize: function(request){ //this request object needs : viewport , success , failure
         var me = this,
             viewport = request.view;

         var vmdata = viewport.getViewModel().data;

        if(vmdata.currentAuthView) {
            vmdata.currentAuthView.destroy();
         }

         vmdata.currentAuthView =  Ext.create('auth.view.auth.Login');
         vmdata.authSuccess = request.success;
         vmdata.authFailure = request.failure;

        viewport.add(vmdata.currentAuthView);


        /*
            if(request.success){
            if( Ext.isFunction(request.success)){
                request.success();
            }
        }*/
    },

    onRouteBeforeLogin: function () {
        debugger;
    },

    onRouteLogin: function () {
        debugger;
    },

    onRouteBeforeRegister: function () {
        debugger;
    },

    onRouteRegister: function () {
        debugger;
    },

    setCurrentView: function(hashtag, is_popup) {
        var me=this;
        if(is_popup == undefined) {
            is_popup=false;
        };

        var vmdata=me.getViewModel().data;
        if(vmdata.currentView) {
            vmdata.currentView.destroy();
        }

        if(hashtag in me.valid_views) {
            vmdata.currentView = Ext.create("Admin.view."+ me.valid_views[hashtag].view);
        } else{
            vmdata.currentView = Ext.create("Admin.view.pages.Error404Window");
        }
        var mainCardPanel = me.getView().query('#mainCardPanel')[0];
        mainCardPanel.add(vmdata.currentView)
        me.setActiveItemSelected(hashtag, me.valid_views[hashtag].parent);
        this.manageNavigationMinHeight();
    }

});