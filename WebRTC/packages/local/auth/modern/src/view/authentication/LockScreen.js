Ext.define('auth.view.authentication.LockScreen', {
    extend: 'auth.view.authentication.LockingWindow',
    xtype: 'lockscreen',

    requires: [
        'auth.view.authentication.Dialog'
    ],

    title: 'Session Expired',

    defaultFocus : 'authdialog',  // Focus the Auth Form to force field focus as well

    items: [

    ]
});
