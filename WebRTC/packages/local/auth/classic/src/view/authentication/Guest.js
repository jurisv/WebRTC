Ext.define('auth.view.authentication.Guest', {
    extend: 'auth.view.authentication.LockingWindow',
    xtype: 'guest',

    requires: [
        'auth.view.authentication.Dialog',
        'Ext.container.Container',
        'Ext.form.field.Text',
        'Ext.form.field.Checkbox',
        'Ext.button.Button'
    ],

    title: 'Just Visiting',
    defaultFocus: 'authdialog', // Focus the Auth Form to force field focus as well

    items: [
        {
            xtype: 'authdialog',
            defaultButton : 'loginButton',
            autoComplete: true,
            bodyPadding: '20 20',
            cls: 'auth-dialog-login',
            header: false,
            width: 415,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },

            defaults : {
                margin : '5 0'
            },

            items: [
                {
                    xtype: 'label',
                    text: 'What should we call you?'
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
                    name: 'fullName',
                    bind: '{fullName}',
                    height: 55,
                    hideLabel: true,
                    allowBlank : false,
                    emptyText: 'nickname',
                    triggers: {
                        glyphed: {
                            cls: 'trigger-glyph-noop auth-email-trigger'
                        }
                    }
                },
                {
                    xtype: 'button',
                    reference: 'loginButton',
                    scale: 'large',
                    // ui: 'soft-green',
                    iconAlign: 'right',
                    iconCls: 'x-fa fa-angle-right',
                    text: 'Enter',
                    formBind: true,
                    listeners: {
                        click: 'onEnterButton'
                    }
                }
            ]
        }
    ],

    initComponent: function() {
        this.addCls('user-login-register-container');
        this.callParent(arguments);
    }
});
