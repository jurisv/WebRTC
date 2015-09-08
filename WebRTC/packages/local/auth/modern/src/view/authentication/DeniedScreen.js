Ext.define('auth.view.authentication.DeniedScreen', {
    extend: 'auth.view.authentication.LockingWindow',
    xtype: 'deniedscreen',

    requires: [
        'auth.view.authentication.Dialog'

    ],

    title: 'Access Denied',

    defaultFocus : 'authdialog',  // Focus the Auth Form to force field focus as well

    items: [

    ]
});
