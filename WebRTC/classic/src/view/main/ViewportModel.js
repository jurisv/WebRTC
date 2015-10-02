Ext.define('WebRTC.view.main.ViewportModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.mainviewport',

    data: {
        name: null,                     // set cookie on init
        user: null,                     // set cookie on init
        appTitle: 'Sencha Communicator',      // Title used for auth package
        authToken: 'myAuthTokenHere'    // This would be a user auth token like auth0 or  oAuth
    },
    formulas: {
        isUser: function (get) {
            return !!get('user');
        },
        isAdmin: function (get) {
            return get('name') == 'admin';    //shows config button if name is admin
        }

    }
});
