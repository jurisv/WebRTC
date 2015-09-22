Ext.define('WebRTC.view.main.ViewportController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.mainviewport',

    routes : {
        'home' : {
            action  : 'onRouteHome'
        }
    },
    listen: {
        component: {
            'app-main': {
                back: 'onNavigationPop'
            }
        },

        controller: {
            '#' : {
                unmatchedroute : 'onRouteUnmatched'
            }
        }
    },

    onRouteHome: function(){
        console.log('home route')
    },

    onRouteUnmatched:function(route){
        console.log('unmatched route' , route);
        this.redirectTo('home');
    },


    onNavigationPop: function () {
        Ext.util.History.back();
        var dataview = this.getView().down('dataview');

        dataview.deselectAll(true);
    }
});
