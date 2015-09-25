Ext.define('WebRTC.view.settings.User', {
    extend: 'Ext.form.Panel',
    xtype: 'settingsuser',

    requires: [
        'WebRTC.view.settings.UserController'
    ],

    controller: 'settingsuser',
    scrollable: true,
    items: [{
        xtype: 'label',
        reference: 'statusLabel',
        cls: 'status-top-label',
        hidden: true,
        text: 'An error has occurred'
    }, {
        xtype: 'tabpanel',
        bodyPadding: 15,
        tabBarHeaderPosition: 2,
        items: [
            {
                title: 'General',
                items: [
                    {
                        xtype: 'fieldset',
                        title: 'Status',
                        defaults: {
                            anchor: '100%',
                            labelWidth: 180
                        },
                        items: [{
                            xtype: 'textfield',
                            allowBlank: false,
                            fieldLabel: 'Mood Message',
                            emptyText: 'out to lunch... back later',
                            name: 'status_msg',
                            bind: '{status_msg}'
                        }]
                    },{
                        xtype: 'fieldset',
                        title: 'Info',
                        defaults: {
                            anchor: '100%',
                            labelWidth: 180
                        },
                        items: [{
                            xtype: 'textfield',
                            allowBlank: false,
                            fieldLabel: 'Name',
                            emptyText: 'Fullname',
                            name: 'fn',
                            bind: '{fn}'
                        }, {
                            xtype: 'textfield',
                            fieldLabel: 'Company',
                            emptyText: 'Sencha, Inc.',
                            name: 'company',
                            bind: '{company}'
                        }, {
                            xtype: 'textfield',
                            fieldLabel: 'Title',
                            emptyText: 'VP of mojo enhancement.',
                            name: 'title',
                            bind: '{title}'
                        },{
                            xtype: 'radiogroup',
                            fieldLabel: 'Gender',
                            columns: 2,
                            bind: {value: {gender: '{gender}'} },
                            defaults: {
                                name: 'gender'
                            },
                            items: [{
                                boxLabel: 'Male',
                                inputValue: 'm'
                            },{
                                boxLabel: 'Female',
                                inputValue: 'f'
                            }]
                        }]
                    }
                ]
            }, {
                title: 'Contact',
                items: [{
                    xtype: 'fieldset',
                    title: 'Location',
                    defaults: {
                        anchor: '100%',
                        labelWidth: 180
                    },
                    items: [{
                        xtype: 'textfield',
                        fieldLabel: 'Country',
                        emptyText: 'United States',
                        name: 'country',
                        bind: '{country}'
                    }, {
                        xtype: 'textfield',
                        fieldLabel: 'State',
                        emptyText: 'California',
                        name: 'state',
                        bind: '{state}'
                    }, {
                        xtype: 'textfield',
                        fieldLabel: 'Location',
                        emptyText: 'Country, state, city or metro area.',
                        name: 'location',
                        bind: '{location}'
                    }]
                },{
                    xtype: 'fieldset',
                    title: 'Voice',
                    defaults: {
                        anchor: '100%',
                        labelWidth: 180
                    },
                    items: [{
                        xtype: 'textfield',
                        fieldLabel: 'Work',
                        emptyText: '(xxx) xxx-xxxx',
                        name: 'tel_work',
                        bind: '{tel_work}'
                    }, {
                        xtype: 'textfield',
                        fieldLabel: 'Cell',
                        emptyText: '(xxx) xxx-xxxx',
                        name: 'tel_cell',
                        bind: '{tel_cell}'
                    }]
                }]
            }, {
                title: 'Preferences',
                items: [
                    {
                        xtype: 'fieldset',
                        title: 'Sounds',
                        defaults: {
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
                            }, {
                                xtype: 'combobox',
                                store: 'Sounds',
                                fieldLabel: 'Enter Room Sound',
                                queryMode: 'local',
                                displayField: 'id',
                                valueField: 'id',
                                name: 'enter-sound'
                            }, {
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
                        title: 'Startup',
                        defaults: {
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

                ]
            }, {
                title: 'Security',
                items: [
                    {
                        xtype: 'fieldset',
                        title: 'Account',
                        defaults: {
                            anchor: '100%',
                            labelWidth: 180
                        },
                        items: [
                            {
                                xtype: 'button',
                                reference: 'changePassword',
                                scale: 'large',
                                // ui: 'soft-blue',
                                iconAlign: 'right',
                                iconCls: 'x-fa fa-lock',
                                text: 'Change Password',
                                listeners: {
                                    click: 'onChangePassword'
                                }
                            }, {
                                xtype: 'displayfield'
                            }, {
                                xtype: 'button',
                                reference: 'changeEmail',
                                scale: 'large',
                                // ui: 'soft-blue',
                                iconAlign: 'right',
                                iconCls: 'x-fa fa-envelope',
                                text: 'Change Email',
                                listeners: {
                                    click: 'onChangeEmail'
                                }
                            }
                        ]
                    }
                ]
            }]
    }],


    bbar: [
        {
            iconCls: 'x-fa fa-sign-out',
            action: 'cancel',
            text: 'Sign Out',
            handler: 'signOut'
        }
        , '->',
        {
            iconCls: 'x-fa fa-thumbs-o-up',
            action: 'ok',
            text: 'OK',
            handler: 'saveSettings'
        }
    ]

});
