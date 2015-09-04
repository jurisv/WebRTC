Ext.define('auth.view.authentication.DeniedScreen', {
    extend: 'auth.view.authentication.LockingWindow',
    xtype: 'lockscreen',

    requires: [
        'auth.view.authentication.Dialog',
        'Ext.button.Button',
        'Ext.container.Container',
        'Ext.form.field.Text',
        'Ext.layout.container.HBox',
        'Ext.layout.container.VBox'
    ],

    title: 'Access Denied',

    defaultFocus : 'authdialog',  // Focus the Auth Form to force field focus as well

    items: [
        {
            xtype: 'authdialog',
            reference: 'authDialog',
            defaultButton : 'loginButton',
            autoComplete: false,
            width: 455,
            cls: 'auth-dialog-login',
            defaultFocus : 'textfield[inputType=password]',
            layout: {
                type  : 'vbox',
                align : 'stretch'
            },

            items: [
                {
                    xtype: 'container',
                    cls: 'auth-profile-wrap',
                    height : 120,
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
                            alt: 'lockscreen-image',
                            // src: 'resources/images/user-profile/2.png',
                            cls: 'lockscreen-profile-img auth-profile-img'
                        },
                        {
                            xtype: 'box',
                            html: '<div class=\'user-name-text\'> Unauthorized </div><div class=\'user-post-text\'> invalid credentials </div>'
                        }
                    ]
                },

                {
                    xtype: 'container',
                    padding: '0 20',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },

                    defaults: {
                        margin: '10 0'
                    },

                    items: [
                        {
                            xtype: 'component',
                            html: '<div style="text-align:right">' +
                                '<a href="#login" class="link-forgot-password">'+
                                    'or, sign in using other credentials</a>' +
                                '</div>'
                        }
                    ]
                }
            ]
        }
    ]
});
