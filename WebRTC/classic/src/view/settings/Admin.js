Ext.define('WebRTC.view.settings.Admin', {
    extend: 'Ext.form.Panel',
    xtype: 'settingsadmin',

    bodyPadding: 10,
    autoScroll: true,

    defaultFocus: 'textfield [name=otApiKey]',
    defaultButton: 'okButton',

    viewModel: {
        type: 'settingsadmin'
    },

    items: [
        {
            xtype: 'fieldset',
            title: 'OpenTok Settings',
            defaults:{
                anchor: '100%'
            },
            items: [
                {
                    xtype:'textfield',
                    fieldLabel: 'ApiKey',
                    name: 'otApiKey',
                    bind: '{adminSettings.otApiKey}'
                },
                {
                    xtype:'textfield',
                    fieldLabel: 'SecretKey',
                    inputType: 'password',
                    name: 'otSecretKey',
                    bind: '{adminSettings.otSecretKey}'
                }
            ]
        },{
            xtype: 'fieldset',
            title: 'Firebase Settings',
            defaults:{
                anchor: '100%'
            },
            items: [
                {
                    xtype:'textfield',
                    fieldLabel: 'Base URL',
                    name: 'fbUrl',
                    bind: '{adminSettings.fbUrl}'
                },{
                    xtype:'textfield',
                    fieldLabel: 'ApiKey',
                    name: 'fbApiKey',
                    bind: '{adminSettings.fbApiKey}'
                },
                {
                    xtype:'textfield',
                    fieldLabel: 'SecretKey',
                    inputType: 'password',
                    name: 'fbSecretKey',
                    bind: '{adminSettings.fbSecretKey}'
                }
            ]
        }
    ],

    bbar:[
        {
            iconCls: 'x-fa fa-thumbs-o-down',
            action:'cancel',
            hidden: true,
            text:'Cancel'
        }
        ,'->',
        {
            iconCls: 'x-fa fa-thumbs-o-up',
            action:'ok',
            reference: 'okButton',
            text:'OK'
        }
    ]

});
