Ext.define('auth.view.authentication.AuthenticationModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.authentication',

    data: {
        provider : '',
        userid : '',
        fullName : '',
        password : '',
        email    : '',
        newpassword : '',
        newemail    : '',
        persist: false,
        agrees : false
    }
});