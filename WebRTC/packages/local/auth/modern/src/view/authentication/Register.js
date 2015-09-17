Ext.define('auth.view.authentication.Register', {
    extend: 'auth.view.authentication.LockingWindow',
    xtype: 'register',

    requires: [
        'auth.view.authentication.Dialog'
    ],

    cls: ['auth-dialog-register'],

    items: [
        {
            xtype: 'titlebar',
            title: 'User Registration',
            docked: 'top'
        },
        {
            xtype: 'authdialog',
            bodyPadding: '20 20',
            reference : 'authDialog',

            defaults : {
                margin: '10 0',
                selectOnFocus : true
            },

            items: [
                {
                    xtype: 'label',
                    reference: 'statusLabel',
                    cls: 'status-top-label',
                    hidden: true,
                    html: 'An error has occurred'
                },
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
                        },
                        {
                            xtype: 'textfield',
                            cls: 'auth-textbox',
                            allowBlank : false,
                            label: 'Username',
                            name: 'userid',
                            bind: '{userid}',
                            emptyText: 'Username'
                        },
                        {
                            xtype: 'textfield',
                            cls: 'auth-textbox',
                            allowBlank : false,
                            label: 'email',
                            name: 'email',
                            emptyText: 'user@example.com',
                            vtype: 'email',
                            bind: '{email}'
                        },
                        {
                            xtype: 'textfield',
                            cls: 'auth-textbox',
                            allowBlank : false,
                            label: 'Password',
                            emptyText: 'Password',
                            name: 'password',
                            inputType: 'password',
                            bind: '{password}'
                        },
                        {
                            xtype: 'checkboxfield',
                            name: 'agrees',
                            cls: 'form-panel-font-color rememberMeCheckbox',
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
                    iconAlign: 'top',
                    iconCls: 'x-fa fa-angle-right',
                    text: 'Signup',
                    listeners: {
                        click: 'onSignupClick'
                    }
                },
                {
                    xtype: 'button',
                    scale: 'large',
                    // ui: 'facebook',
                    hiden: true,
                    margin: '5 0',
                    iconAlign: 'top',
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

