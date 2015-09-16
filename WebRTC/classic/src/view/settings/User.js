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
                    fieldLabel: 'Chat Sound',
                    queryMode: 'local',
                    displayField: 'id',
                    valueField: 'id',
                    name: 'chat-sound'
                },{
                    xtype: 'combobox',
                    store: 'Sounds',
                    fieldLabel: 'Enter Room Sound',
                    queryMode: 'local',
                    displayField: 'id',
                    valueField: 'id',
                    name: 'enter-sound'
                },{
                    xtype: 'combobox',
                    store: 'Sounds',
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
                store: 'rooms',
                queryMode: 'local',
                displayField: 'name',
                valueNotFoundText: 'Room No Longer Found',
                valueField: 'id',
                name: 'launchroom'

            }]
        }

    ],

    bbar:[
        {
            iconCls: 'x-fa fa-sign-out',
            action:'cancel',
            text:'Sign Out',
            handler: 'signOut'
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
