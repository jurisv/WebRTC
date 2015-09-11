Ext.define('auth.view.authentication.ChangeEmail', {
    extend: 'auth.view.authentication.LockingWindow',
    xtype: 'changemail',

    requires: [
        'auth.view.authentication.Dialog',
        'Ext.form.Label',
        'Ext.form.field.Text',
        'Ext.button.Button'
    ],

    title: 'Change Email',

    defaultFocus : 'authdialog',  // Focus the Auth Form to force field focus as well

    items: [
        {
            xtype: 'authdialog',
            width: 455,
            defaultButton: 'changeEmail',
            autoComplete: true,
            bodyPadding: '20 20',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },

            defaults : {
                margin: '10 0'
            },

            cls: 'auth-dialog-login',
            items: [
                {
                    xtype: 'label',
                    cls: 'lock-screen-top-label',
                    text: 'Enter your current email address and new preferred email'
                },
                {
                    xtype: 'label',
                    reference: 'statusLabel',
                    cls: 'status-top-label',
                    hidden: true,
                    text: 'An error has occurred'
                },
                {
                    xtype: 'textfield',
                    cls: 'auth-textbox',
                    height: 55,
                    name: 'email',
                    bind: '{email}',
                    hideLabel: true,
                    allowBlank: false,
                    emptyText: 'current email',
                    vtype: 'email',
                    triggers: {
                        glyphed: {
                            cls: 'trigger-glyph-noop auth-email-trigger'
                        }
                    }
                },
                {
                    xtype: 'textfield',
                    cls: 'auth-textbox',
                    height: 55,
                    name: 'newemail',
                    bind: '{newemail}',
                    hideLabel: true,
                    allowBlank: false,
                    emptyText: 'user@example.com',
                    vtype: 'email',
                    triggers: {
                        glyphed: {
                            cls: 'trigger-glyph-noop auth-email-trigger'
                        }
                    }
                },
                {
                    xtype: 'textfield',
                    cls: 'auth-textbox',
                    height: 55,
                    hideLabel: true,
                    allowBlank : false,
                    emptyText: 'Password',
                    name: 'password',
                    inputType: 'password',
                    bind: '{password}',
                    triggers: {
                        glyphed: {
                            cls: 'trigger-glyph-noop auth-password-trigger'
                        }
                    }
                },
                {
                    xtype: 'button',
                    reference: 'changeEmail',
                    scale: 'large',
                    // ui: 'soft-blue',
                    formBind: true,
                    iconAlign: 'right',
                    iconCls: 'x-fa fa-angle-right',
                    text: 'Change Email',
                    listeners: {
                        click: 'onChangeEmail'
                    }
                },
                {
                    xtype: 'component',
                    html: '<div style="text-align:right">' +
                        '<a href="#home" class="link-forgot-password">'+
                            'Close</a>' +
                        '</div>'
                }
            ]
        }
    ]
});
