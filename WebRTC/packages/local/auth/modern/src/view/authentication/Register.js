Ext.define('auth.view.authentication.Register', {
    extend: 'auth.view.authentication.LockingWindow',
    xtype: 'register',

    requires: [
        'auth.view.authentication.Dialog'
    ],

    title: 'User Registration',
    defaultFocus: 'authdialog',  // Focus the Auth Form to force field focus as well

    items: [

    ]
});
