Ext.define('auth.view.auth.PasswordReminder', {
    extend: 'Ext.window.Window',
    alias: 'widget.authpasswordreminder',

    requires: [
        'auth.view.auth.PasswordReminderViewModel',
        'auth.view.auth.PasswordReminderViewController',
        'Ext.form.Panel',
        'Ext.form.Label',
        'Ext.form.field.Text',
        'Ext.form.trigger.Trigger',
        'Ext.button.Button',
        'Ext.toolbar.Spacer'
    ],

    controller: 'authpasswordreminder',
    viewModel: {
        type: 'authpasswordreminder'
    },
    autoShow: true,
    cls: 'user-login-register-container',
    closable: false,
    title: 'Sencha',
    titleAlign: 'center',
    maximized: true,
    modal: true,

    layout: {
        type: 'vbox',
        align: 'center',
        pack: 'center'
    },
    items: [
        {
            xtype: 'container',
            layout: {
                type: 'vbox',
                align: 'center',
                pack: 'center'
            },
            items: [
                {
                    xtype: 'form',
                    width: 455,
                    layout: {
                        type: 'vbox'
                    },
                    padding:20,
                    cls:'password-reminder-wrap',
                    items:[
                        {
                            xtype: 'label',
                            cls: 'lock-screen-top-label',
                            width: 415,
                            text: 'Forgot Password'
                        },
                        {
                            xtype: 'textfield',
                            cls: 'signin-textbox',
                            height: 55,
                            width: 415,
                            margin:'10 0',
                            fieldLabel: 'Username',
                            hideLabel: true,
                            emptyText: 'example@example.com',
                            triggers: {
                                mytrigger1: {
                                    cls: 'signin-email-trigger'
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            cls: 'lock-screen-login-button register-login-button',
                            height: 55,
                            width: 415,
                            margin:'10 0',
                            iconAlign: 'right',
                            iconCls: 'x-fa  fa-angle-right',
                            text: 'Signup',
                            listeners: {
                                click: 'onButtonClick'
                            }
                        },
                        {
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'button',
                                    cls: 'register-page-back-button',
                                    width: 150,
                                    text: 'Back to Login',
                                    listeners: {
                                        click: 'onLoginButtonClick'
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]

});