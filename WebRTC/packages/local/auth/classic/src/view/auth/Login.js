Ext.define('auth.view.auth.Login', {
    extend: 'Ext.window.Window',
    alias: 'widget.authlogin',

    requires: [
        'auth.view.auth.LoginViewModel',
        'auth.view.auth.LoginViewController',
        'Ext.form.Panel',
        'Ext.form.Label',
        'Ext.form.field.Text',
        'Ext.form.trigger.Trigger',
        'Ext.form.field.Checkbox',
        'Ext.button.Button'
    ],

    controller: 'authlogin',
    autoShow: true,
    cls: 'user-login-register-container',
    closable: false,
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
                    padding:20,
                    cls:'login-form-wrap',
                    header: false,
                    manageHeight: false,
                    layout: {
                        type: 'vbox'
                    },
                    items: [
                        {
                            xtype: 'container',
                            cls: 'lock-screen-body',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    cls: 'lock-screen-top-label',
                                    width: 415,
                                    text: 'Sign in your account'
                                },
                                {
                                    xtype: 'textfield',
                                    cls: 'signin-textbox',
                                    height: 55,
                                    margin: '10 0',
                                    width: 415,
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
                                    xtype: 'textfield',
                                    cls: 'signin-textbox',
                                    height: 55,
                                    margin: '10 0',
                                    width: 415,
                                    fieldLabel: 'Username',
                                    hideLabel: true,
                                    emptyText: 'Password',
                                    inputType:'password',
                                    triggers: {
                                        mytrigger1: {
                                            cls: 'signin-password-trigger'
                                        }
                                    }
                                },
                                {
                                    xtype: 'container',
                                    padding: '5 0 10 0',
                                    width: 415,
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'checkboxfield',
                                            margin:'0 0 0 1',
                                            cls: 'form-panel-font-color rememberMeCheckbox',
                                            height: 30,
                                            boxLabel: 'Remember me'
                                        },
                                        {
                                            xtype: 'container',
                                            html: '<a href="#auth.PasswordReminder" class="forgot-password"> Forgot Password ?</a>'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'button',
                                    cls: 'lock-screen-login-button',
                                    height: 55,
                                    width: 415,
                                    iconAlign: 'right',
                                    iconCls: 'x-fa  fa-angle-right',
                                    text: 'Login',
                                    listeners: {
                                        click: 'onLoginButtonClick'
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
                                    width: 415,
                                    iconAlign: 'right',
                                    iconCls: 'x-fa  fa-facebook',
                                    text: 'Login with Facebook',
                                    listeners: {
                                        click: 'onLoginFBButtonClick'
                                    }
                                },
                                {
                                    xtype: 'container',
                                    html: '<div class="outer-div"><div class="seperator">New User</div></div>',
                                    width: 415,
                                    margin:'10 0'
                                },
                                {
                                    xtype: 'button',
                                    cls: 'signin-create-account-button',
                                    height: 55,
                                    width: 415,
                                    iconAlign: 'right',
                                    iconCls: 'x-fa  fa-user-plus',
                                    text: 'Create Account',
                                    listeners: {
                                        click: 'onRegisterButtonClick'
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