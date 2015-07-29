Ext.define('WebRTC.view.settings.Admin', {
    extend: 'Ext.form.Panel',
    xtype: 'settingsadmin',

    bodyPadding: 10,
    autoScroll: true,

    defaultFocus: 'textfield [name=otApiKey]',
    defaultButton: 'okButton',

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
                    // twoWayBindable : ['value'],
                    // publishes: ['value'],
                    bind: '{adminSettings.otApiKey}' // '{adminSettings.serviceprovider.opentok.ApiKey}'
                },
                {
                    xtype:'textfield',
                    fieldLabel: 'SecretKey',
                    inputType: 'password',
                    name: 'otSecretKey',
                    bind: '{adminSettings.otSecretKey}' //'{adminSettings.otSecretKey}'
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
                    bind: '{adminSettings.fbUrl}' //'{adminSettings.fbUrl}'
                },{
                    xtype:'textfield',
                    fieldLabel: 'ApiKey',
                    name: 'fbApiKey',
                    bind: '{adminSettings.serviceprovider.firebase.ApiKey}' // '{adminSettings.fbApiKey}'
                },
                {
                    xtype:'textfield',
                    fieldLabel: 'SecretKey',
                    inputType: 'password',
                    name: 'fbSecretKey',
                    bind: '{adminSettings.fbSecretKey}' //'{adminSettings.fbSecretKey}'
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
