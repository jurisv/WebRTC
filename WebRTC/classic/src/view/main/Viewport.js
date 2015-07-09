Ext.define('WebRTC.view.main.Viewport', {
    extend: 'Ext.panel.Panel',
    xtype: 'app-main',

    requires: [
        'Ext.plugin.Viewport',
        'Ext.window.MessageBox'
    ],

    controller: 'mainviewport',

    viewModel: {
        data : {
            homeRoom:{
                //TODO: This data should be moved into init routines
                openTokParams: {
                    apiKey: '45254262',
                    sessionId: '1_MX40NTI1NDI2Mn5-MTQzNDE0MDE2ODcxN35Vb0xRRkdSQmRtbzZUR1JyeUhvMUhRSjN-fg',
                    token:'T1==cGFydG5lcl9pZD00NTI1NDI2MiZzaWc9OGNkN2IzM2UwOWM0YzQxZmJmYWFmZDJiOTRlOGFlYjFhMGJmZDI5NDpzZXNzaW9uX2lkPTFfTVg0ME5USTFOREkyTW41LU1UUXpOREUwTURFMk9EY3hOMzVWYjB4UlJrZFNRbVJ0YnpaVVIxSnllVWh2TVVoUlNqTi1mZyZjcmVhdGVfdGltZT0xNDM0MTQ3NDc4Jm5vbmNlPTAuMjc2NzkzOTg1NjI3NTkxNiZyb2xlPXB1Ymxpc2hlciZleHBpcmVfdGltZT0xNzM1NzE4NDAwMDAwJmNvbm5lY3Rpb25fZGF0YT1uYW1lJTNEYW5vbnltb3Vz'
                }
            }
        }
    },

    flex: 1,
    layout: {
        type: 'hbox',
        align: 'stretch'
    },

    items: [
        {
        flex: 1,
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        items:[
            {
                xtype: 'tabpanel',
                flex:3,
                items:[{
                    title: 'Users',
                    xtype: 'chatmembers',
                    reference: 'homeusers',
                    iconCls: 'x-fa fa-home',
                    flex: 1
                },
                {
                    title: 'Rooms',
                    xtype: 'chatrooms',
                    iconCls: 'x-fa fa-keyboard-o',
                    flex: 1,
                    reference: 'homerooms'
                }
                ]
            },
            {
                xtype: 'tabpanel',
                flex:1,
                items:[{
                    title: '1:1 Chat',
                    xtype: 'chatmembers',
                    reference: 'privateusers',
                    iconCls: 'x-fa fa-shield',
                    flex: 1
                }]
            }
        ]
    },
    {
        xtype: 'tabpanel',
        reference: 'roomtabs',
        flex:4,
        items:[]
    }
    ],
    listeners:{
       // afterrender: ''
    }
});
