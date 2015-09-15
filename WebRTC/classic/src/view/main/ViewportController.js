Ext.define('WebRTC.view.main.ViewportController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.mainviewport',

    requires: [
        'Ext.window.Toast'
    ],

    routes : {
        'home' : {
            action  : 'onRouteHome'
        }
    },
    listen: {
        controller: {
            '#' : {
                unmatchedroute : 'onRouteUnmatched'
            }
        }
    },
    onRouteHome: function(){
    },

    onRouteUnmatched:function(route){
        if(!!route){
            console.log('unmatched route' + route);
            window.location.hash = '#home';
        }
    }
});
