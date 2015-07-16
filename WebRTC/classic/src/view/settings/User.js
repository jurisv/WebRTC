Ext.define('WebRTC.view.settings.User', {
    extend: 'Ext.form.Panel',
    xtype: 'settingsuser',

    bodyPadding: 10,
    autoScroll: true,



    items: [
        {
            xtype: 'fieldset',
            title: 'Authorization',
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
            title: 'Profile',
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
