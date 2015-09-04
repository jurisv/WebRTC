Ext.define('auth.view.auth.LockScreenWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.authlockscreenwindow',

    requires: [
        'auth.view.auth.LockScreenWindowViewModel',
        'auth.view.auth.LockScreenWindowViewController',
        'Ext.form.Panel',
        'Ext.Img',
        'Ext.form.Label',
        'Ext.form.field.Text',
        'Ext.form.trigger.Trigger',
        'Ext.button.Button',
        'Ext.toolbar.Spacer'
    ],

    controller: 'authlockscreenwindow',
    viewModel: {
        type: 'authlockscreenwindow'
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
                        type: 'vbox',
                        align: 'center',
                        pack: 'center'
                    },
                    items: [
                        {
                            xtype: 'container',
                            cls: 'bluePanelCls',
                            height: '',
                            width: '100%',
                            layout: {
                                type: 'hbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'image',
                                    height: 80,
                                    margin: 20,
                                    width: 80,
                                    cls: 'lockscreen-profile-img',
                                    src: 'classic/resources/images/user-profile/2.png'
                                },
                                {
                                    xtype: 'container',
                                    html: '<div class=\'user-name-text\'> John Deo </div><div class=\'user-post-text\'> Administrator </div>'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            cls: 'lock-screen-body',                          
                            width: 455,
                            padding:'16 20',
                            layout: {
                                type: 'vbox'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    cls: 'lock-screen-top-label',
                                    width: 415,
                                    text: 'Please enter your password to unlock the screen'
                                },
                                {
                                    xtype: 'textfield',
                                    flex: 1,
                                    cls: 'lock-screen-password-textbox',
                                    height: 55,
                                    margin: '10 0',
                                    maxHeight: 55,
                                    width: 415,
                                    fieldLabel: 'Username',
                                    hideLabel: true,
                                    emptyText: 'Password',
                                    triggers: {
                                        mytrigger1: {
                                            cls: 'password-trigger'
                                        }
                                    }
                                },
                                {
                                    xtype: 'button',
                                    flex: 1,
                                    cls: 'lock-screen-login-button',
                                    height: 55,
                                    margin: '10 0 ',
                                    maxHeight: 55,
                                    width: 415,
                                    iconAlign: 'right',
                                    iconCls: 'x-fa  fa-angle-right',
                                    text: 'Login',
                                    listeners: {
                                        click: 'onButtonClick'
                                    }
                                },
                                {
                                    xtype: 'container',
                                    layout: {
                                        type: 'hbox'
                                    },
                                    margin:'10 0 0 0',
                                    items: [
                                        {
                                            xtype: 'button',
                                            cls: 'register-page-back-button',
                                            text: 'Sign in using different account',
                                            listeners: {
                                                click: 'onLoginButtonClick'
                                            }
                                        },
                                        {
                                            xtype: 'tbspacer'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]

});