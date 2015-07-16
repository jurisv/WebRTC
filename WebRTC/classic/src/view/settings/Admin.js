Ext.define('WebRTC.view.settings.Admin', {
    extend: 'Ext.form.Panel',
    xtype: 'settingsadmin',

    bodyPadding: 10,
    autoScroll: true,



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
                    name: 'OTApiKey'
                },
                {
                    xtype:'textfield',
                    fieldLabel: 'SecretKey',
                    inputType: 'password',
                    name: 'OTSecretKey'
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
                    fieldLabel: 'ApiKey',
                    name: 'FBApiKey'
                },
                {
                    xtype:'textfield',
                    fieldLabel: 'SecretKey',
                    inputType: 'password',
                    name: 'FBSecretKey'
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
            text:'OK'
        }
    ]

});
