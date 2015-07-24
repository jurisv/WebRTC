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
                    publishes: ['value'],
                    // name: 'serviceprovider.opentok.ApiKey',
                    // reference: 'serviceprovider.opentok.ApiKey',
                    bind: '{theData.serviceprovider.opentok.ApiKey}'
                },
                {
                    xtype:'textfield',
                    fieldLabel: 'SecretKey',
                    inputType: 'password',
                    name: 'otSecretKey',
                    bind: '{theData.otSecretKey}'
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
                    bind: '{theData.fbUrl}'
                },{
                    xtype:'textfield',
                    fieldLabel: 'ApiKey',
                    name: 'fbApiKey',
                    bind: '{theData.serviceprovider.firebase.ApiKey}'
                },
                {
                    xtype:'textfield',
                    fieldLabel: 'SecretKey',
                    inputType: 'password',
                    name: 'fbSecretKey',
                    bind: '{theData.fbSecretKey}'
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
