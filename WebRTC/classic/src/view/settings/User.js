Ext.define('WebRTC.view.settings.User', {
    extend: 'Ext.form.Panel',
    xtype: 'settingsuser',

    requires: [
        'WebRTC.view.settings.UserController'
    ],

    controller: 'settingsuser',
    // viewModel: {
    //     stores: {
    //         sounds: {
    //             autoLoad: true,
    //             fields: ['id', 'wav', 'mp3', 'ogg'],
    //             proxy: {
    //                 type: 'ajax',
    //                 url: 'resources/sounds.json',
    //                 reader: {
    //                     type: 'json',
    //                     rootProperty: 'data'
    //                 }
    //             }
    //         }
    //     }
    // },

    bodyPadding: 10,
    autoScroll: true,



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
                    xtype: 'combobox',
                    store: 'Sounds',
                    // bind: {
                    //     store: '{sounds}'
                    // },
                    fieldLabel: 'Chat Sound',
                    queryMode: 'local',
                    displayField: 'id',
                    valueField: 'id',
                    name: 'chat-sound'
                },{
                    xtype: 'combobox',
                    store: 'Sounds',
                    // bind: {
                    //     store: '{sounds}'
                    // },
                    fieldLabel: 'Enter Room Sound',
                    queryMode: 'local',
                    displayField: 'id',
                    valueField: 'id',
                    name: 'enter-sound'
                },{
                    xtype: 'combobox',
                    store: 'Sounds',
                    // bind: {
                    //     store: '{sounds}'
                    // },
                    fieldLabel: 'Leave Room Sound',
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
                xtype: 'combobox',
                fieldLabel: 'Launch Room',
                bind:{
                    store: '{rooms}'
                },
                queryMode: 'local',
                displayField: 'name',
                valueField: 'id',
                name: 'launchroom'

            }]
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
            text:'OK',
            handler: 'saveSettings'
        }
    ]

});
