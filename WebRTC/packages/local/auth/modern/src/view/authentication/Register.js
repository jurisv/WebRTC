Ext.define('auth.view.authentication.Register', {
    extend: 'auth.view.authentication.LockingWindow',
    xtype: 'register',

    requires: [
        'auth.view.authentication.Dialog',

        /*
        NOTE: Although register doesn't really require these they are placed here
        to remove the dependency to look them up for the 'modern' toolkit
        */
        'auth.view.authentication.LockingWindow',
        'auth.view.authentication.Login',
        'auth.view.authentication.DeniedScreen',
        'auth.view.authentication.LockScreen',
        'auth.view.authentication.PasswordReset'

    ],

    layout: 'fit',    

    items: [
        {
            xtype: 'titlebar',
            title: 'User Registration',
            docked: 'top'
        },
        {
            xtype: 'authdialog',
            bodyPadding: '20 20',
            // width: 455,
            reference : 'authDialog',

            // defaultButton : 'submitButton',
            // autoComplete: true,
            // cls: ['auth-dialog-register'],
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            defaults : {
                margin: '10 0',
                selectOnFocus : true
            },
            items: [
                // {
                //     xtype: 'label',
                //     cls: 'lock-screen-top-label',
                //     text: 'Create an account'
                // },
                // {
                //     xtype: 'label',
                //     reference: 'statusLabel',
                //     cls: 'status-top-label',
                //     hidden: true,
                //     text: 'An error has occurred'
                // },
                {
                    xtype: 'fieldset',
                    title: 'Create an account',
                    items: [
                        {
                            xtype: 'textfield',
                            cls: 'auth-textbox',
                            // height: 55,
                            // hideLabel: true,
                            label: 'Full Name',
                            allowBlank : false,
                            emptyText: 'Fullname',
                            name: 'fullName',
                            bind: '{fullName}'
                            // triggers: {
                            //     glyphed: {
                            //         cls: 'trigger-glyph-noop auth-email-trigger'
                            //     }
                            // }
                        },
                        {
                            xtype: 'textfield',
                            cls: 'auth-textbox',
                            // height: 55,
                            // hideLabel: true,
                            allowBlank : false,
                            label: 'Username',
                            name: 'userid',
                            bind: '{userid}',
                            emptyText: 'Username'
                            // triggers: {
                            //     glyphed: {
                            //         cls: 'trigger-glyph-noop auth-email-trigger'
                            //     }
                            // }
                        },
                        {
                            xtype: 'textfield',
                            cls: 'auth-textbox',
                            // height: 55,
                            // hideLabel: true,
                            allowBlank : false,
                            label: 'email',
                            name: 'email',
                            emptyText: 'user@example.com',
                            vtype: 'email',
                            bind: '{email}'
                            // triggers: {
                            //     glyphed: {
                            //         cls: 'trigger-glyph-noop auth-envelope-trigger'
                            //     }
                            // }
                        },
                        {
                            xtype: 'textfield',
                            cls: 'auth-textbox',
                            // height: 55,
                            // hideLabel: true,
                            allowBlank : false,
                            label: 'Password',
                            emptyText: 'Password',
                            name: 'password',
                            inputType: 'password',
                            bind: '{password}'
                            // triggers: {
                            //     glyphed: {
                            //         cls: 'trigger-glyph-noop auth-password-trigger'
                            //     }
                            // }
                        },
                        {
                            xtype: 'checkboxfield',
                            // flex: 1,
                            name: 'agrees',
                            cls: 'form-panel-font-color rememberMeCheckbox',
                            // height: 32,
                            bind: '{agrees}',
                            allowBlank : false,
                            label: 'I agree with the Terms and Conditions',

                            // In this case, the form operation is not VALID unless Terms are agreed upon
                            isValid: function() {
                                var me = this;
                                return me.checked || me.disabled;
                            }
                        }
                    ]
                },
                {
                    xtype: 'button',
                    scale: 'large',
                    // ui: 'soft-blue',
                    formBind: true,
                    reference: 'submitButton',
                    bind: false,
                    margin: '5 0',
                    iconAlign: 'right',
                    iconCls: 'x-fa fa-angle-right',
                    text: 'Signup',
                    listeners: {
                        click: 'onSignupClick'
                    }
                },
                {
                    // xtype: 'box',
                    html: '<div class="outer-div"><div class="seperator">OR</div></div>'
                },
                {
                    xtype: 'button',
                    scale: 'large',
                    // ui: 'facebook',
                    margin: '5 0',
                    iconAlign: 'right',
                    iconCls: 'x-fa fa-facebook',
                    text: 'Login with Facebook',
                    listeners: {
                        click: 'onFaceBookLogin'
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

