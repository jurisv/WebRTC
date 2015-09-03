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

    onAuthorize: function(request){
        if(request.success){
            if( Ext.isFunction(request.success)){
                request.success();
            }
        }
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