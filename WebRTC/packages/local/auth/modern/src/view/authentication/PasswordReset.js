Ext.define('auth.view.authentication.PasswordReset', {
    extend: 'auth.view.authentication.LockingWindow',
    xtype: 'passwordreset',

    requires: [
        'auth.view.authentication.Dialog'
    ],

    cls: 'auth-dialog-login',

    viewModel: {
        type: 'authentication'
    },

    items: [
        {
            xtype: 'authdialog',
            bodyPadding: '20 20',
            defaults : {
                margin : '5 0'
            },

            items: [
                {
                    xtype: 'titlebar',
                    title: 'Reset Password',
                    docked: 'top'
                },
                {
                    xtype: 'fieldset',
                    title: 'Enter your email address for further reset instructions',
                    items: [
                        {
                            xtype: 'label',
                            reference: 'statusLabel',
                            cls: 'status-top-label',
                            hidden: true,
                            html: 'An error has occurred'
                        },
                        {
                            xtype: 'textfield',
                            cls: 'auth-textbox',
                            name: 'email',
                            bind: '{email}',
                            label: 'Email',
                            allowBlank: false,
                            emptyText: 'user@example.com',
                            vtype: 'email'
                        }
                    ]
                },
                {
                    xtype: 'button',
                    reference: 'resetPassword',
                    scale: 'large',
                    // ui: 'soft-blue',
                    // formBind: true,
                    iconAlign: 'right',
                    iconCls: 'x-fa fa-angle-right',
                    text: 'Reset Password',
                    listeners: {
                        click: 'onResetClick'
                    }
                },
                {
                    xtype: 'component',
                    html: '<div style="text-align:right">' +
                        '<a href="#login" class="link-forgot-password">'+
                            'Back to Log In</a>' +
                        '</div>'
                }                
            ]
        }
    ]
});
