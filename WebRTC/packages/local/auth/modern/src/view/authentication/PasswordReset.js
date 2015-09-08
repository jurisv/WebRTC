Ext.define('auth.view.authentication.PasswordReset', {
    extend: 'auth.view.authentication.LockingWindow',
    xtype: 'passwordreset',

    requires: [
        'auth.view.authentication.Dialog'
    ],

    title: 'Reset Password',

    defaultFocus : 'authdialog',  // Focus the Auth Form to force field focus as well

    items: [

    ]
});
