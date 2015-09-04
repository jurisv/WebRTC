Ext.define('auth.view.auth.Register', {
    extend: 'Ext.window.Window',
    alias: 'widget.authregister',

    requires: [
        'auth.view.auth.RegisterViewModel',
        'auth.view.auth.RegisterViewController',
        'Ext.form.Panel',
        'Ext.form.Label',
        'Ext.form.field.Text',
        'Ext.form.trigger.Trigger',
        'Ext.form.field.Checkbox',
        'Ext.button.Button',
        'Ext.toolbar.Spacer'
    ],

    controller: 'authregister',
    viewModel: {
        type: 'authregister'
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
                type: 'vbox'
            },
            items: [
                {
                    xtype: 'form',
                    padding:'20 20 15 20',
                    width:455,
                    cls:'register-form-wrap',
                    layout: {
                        type: 'vbox'                    
                    },
                    items: [
                        {
                            xtype: 'label',
                            cls: 'lock-screen-top-label',
                            width: 415,
                            text: 'Create an account'
                        },
                        {
                            xtype: 'textfield',
                            flex: 1,
                            cls: 'signin-textbox',
                            height: 55,
                            margin: '10 0',
                            width: 415,
                            fieldLabel: 'Username',
                            hideLabel: true,
                            emptyText: 'Fullname',
                            triggers: {
                                mytrigger1: {
                                    cls: 'signin-email-trigger'
                                }
                            }
                        },
                        {
                            xtype: 'textfield',
                            flex: 1,
                            cls: 'signin-textbox',
                            height: 55,
                            margin: '10 0',
                            width: 415,
                            fieldLabel: 'Username',
                            hideLabel: true,
                            emptyText: 'Username',
                            triggers: {
                                mytrigger1: {
                                    cls: 'signin-email-trigger'
                                }
                            }
                        },
                        {
                            xtype: 'textfield',
                            flex: 1,
                            cls: 'signin-textbox',
                            height: 55,
                            margin: '10 0',
                            width: 415,
                            fieldLabel: 'Username',
                            hideLabel: true,
                            emptyText: 'example@example.com',
                            triggers: {
                                mytrigger1: {
                                    cls: 'signin-envelope-trigger'
                                }
                            }
                        },
                        {
                            xtype: 'textfield',
                            flex: 1,
                            cls: 'signin-textbox',
                            height: 55,
                            margin: '10 0',
                            width: 415,
                            fieldLabel: 'Username',
                            hideLabel: true,
                            emptyText: 'Passowrd',
                            inputType:'password',
                            triggers: {
                                mytrigger1: {
                                    cls: 'signin-password-trigger'
                                }
                            }
                        },
                        {
                            xtype: 'container',
                            flex: 0.4,
                            width: 415,
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'checkboxfield',
                                    flex: 1,
                                    cls: 'form-panel-font-color rememberMeCheckbox',
                                    height: 32,
                                    boxLabel: 'I agree with the Terms and Conditions'
                                }
                            ]
                        },
                        {
                            xtype: 'button',
                            cls: 'lock-screen-login-button',
                            height: 55,
                            margin: '5 0 ',
                            width: 415,
                            iconAlign: 'right',
                            iconCls: 'x-fa  fa-angle-right',
                            text: 'Signup',
                            listeners: {
                                click: 'onButtonClick'
                            }
                        },
                        {
                            xtype: 'container',
                            html: '<div class="outer-div"><div class="seperator">OR</div></div>',
                            width: 415,
                            margin:'10 0'
                        },
                        {
                            xtype: 'button',
                            cls: 'signin-facebook-button',
                            height: 55,
                            margin: '5 0',
                            width: 415,
                            iconAlign: 'right',
                            iconCls: 'x-fa  fa-facebook',
                            text: 'Login with Facebook',
                            listeners: {
                                click: 'onLogFacebookButtonClick'
                            }
                        },
                        {
                            xtype: 'container',
                            width: '85%',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'button',
                                    cls: 'register-page-back-button',
                                    minWidth: 150,
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