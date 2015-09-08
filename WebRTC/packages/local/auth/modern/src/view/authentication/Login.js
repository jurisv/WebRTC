Ext.define('auth.view.authentication.Login', {
    extend: 'auth.view.authentication.LockingWindow',
    xtype: 'login',

    requires: [
        'auth.view.authentication.Dialog'
    ],

    title: 'Let\'s Log In',
    defaultFocus: 'authdialog', // Focus the Auth Form to force field focus as well

    items: [

    ],

    initComponent: function() {
        this.addCls('user-login-register-container');
        this.callParent(arguments);
    }
});
