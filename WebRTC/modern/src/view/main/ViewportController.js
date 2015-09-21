Ext.define('WebRTC.view.main.ViewportController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.mainviewport',

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
        console.log('home route')
    },

    onRouteUnmatched:function(route){
        console.log('unmatched route' , route);
        this.redirectTo('home');
    }
});
