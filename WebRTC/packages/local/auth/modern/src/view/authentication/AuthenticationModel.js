Ext.define('auth.view.authentication.AuthenticationModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.authentication',

    data: {
        userid   : 'Max',
        fullName : '',
        password : '',
        email    : '',
        persist  : false,
        agrees   : false
    }
});
