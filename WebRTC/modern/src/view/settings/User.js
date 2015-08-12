Ext.define('WebRTC.view.settings.User', {
    extend: 'Ext.form.Panel',
    xtype: 'settingsuser',

    requires: [
        'WebRTC.view.settings.UserController'
    ],

    controller: 'settingsuser',
    bodyPadding: 10,
    scrollable: true,



    items: [
        // {
        //     xtype: 'fieldset',
        //     title: 'Authorization',
        //     defaults:{
        //         anchor: '100%'
        //     },
        //     items: [
        //         {
        //             xtype:'textfield',
        //             fieldLabel: 'ApiKey',
        //             name: 'OTApiKey'
        //         },
        //         {
        //             xtype:'textfield',
        //             fieldLabel: 'SecretKey',
        //             inputType: 'password',
        //             name: 'OTSecretKey'
        //         }
        //     ]
        // },
        // {
        //     xtype: 'fieldset',
        //     title: 'FB Profile',
        //     defaults:{
        //         anchor: '100%'
        //     },
        //     items: [
        //         {
        //             xtype:'textfield',
        //             fieldLabel: 'ApiKey',
        //             name: 'FBApiKey'
        //         },
        //         {
        //             xtype:'textfield',
        //             fieldLabel: 'SecretKey',
        //             inputType: 'password',
        //             name: 'FBSecretKey'
        //         }
        //     ]
        // },
        {
            xtype: 'fieldset',
            title: 'Sounds',
            defaults:{
                anchor: '100%',
                labelWidth: 180
            },
            items: [
                {
                    xtype: 'selectfield',
                    store: 'Sounds',
                    label: 'Chat Sound',
                    queryMode: 'local',
                    displayField: 'id',
                    valueField: 'id',
                    name: 'chat-sound'
                },{
                    xtype: 'selectfield',
                    store: 'Sounds',
                    label: 'Enter Room Sound',
                    queryMode: 'local',
                    displayField: 'id',
                    valueField: 'id',
                    name: 'enter-sound'
                },{
                    xtype: 'selectfield',
                    store: 'Sounds',
                    label: 'Leave Room Sound',
                    queryMode: 'local',
                    displayField: 'id',
                    valueField: 'id',
                    name: 'leave-sound'
                }
            ]
        },
        {
            xtype: 'fieldset',
            title: 'Room Preferences',
            defaults:{
                anchor: '100%',
                labelWidth: 180
            },
            items: [{
                xtype: 'selectfield',
                label: 'Launch Room',
                bind:{
                    store: '{rooms}'
                },
                queryMode: 'local',
                displayField: 'name',
                valueNotFoundText: 'Room No Longer Found',
                valueField: 'id',
                name: 'launchroom'

            }]
        },{
            xtype: 'toolbar',
            docked: 'bottom',
            items: [{
                iconCls: 'x-fa fa-sign-out',
                action:'cancel',
                text:'Sign Out',
                handler: 'signOut'
            },{
                    xtype: 'spacer'
            },{
                    iconCls: 'x-fa fa-thumbs-o-up',
                    action:'ok',
                    text:'OK',
                    handler: 'saveSettings'
            }
            ]
        }

    ],

    bbar:[

    ]

});
