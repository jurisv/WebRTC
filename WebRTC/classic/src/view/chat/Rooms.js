Ext.define('WebRTC.view.chat.Rooms', {
    extend: 'Ext.Panel',
    xtype: 'chatrooms',
    controller : 'chat',
    autoScroll: true,
    bodyPadding: 10,
    items:[{
        xtype: 'dataview',
        itemSelector: 'div.room-wrap',
        tpl: [
            '<tpl for=".">',
            '<div style="margin-bottom: 10px;" class="room-wrap">',
            '{title}',
            '<br/><span>{description}</span>',
            '</div>',
            '</tpl>'
        ],

        viewModel : {
            stores: {
                rooms: {
                    data: [
                    {
                        title: 'General',
                        topic: 'Open to all users',
                        privacy: 'public',
                        owner: 'brad',
                        nickname: '',
                        unreadMessages: 0,
                        numberMembers: null,
                        joined: false,
                        provider: 'OpenTok',
                        providerData: {
                            apiKey: '45254262',
                            sessionId: '1_MX40NTI1NDI2Mn5-MTQzNDE0MDE2ODcxN35Vb0xRRkdSQmRtbzZUR1JyeUhvMUhRSjN-fg',
                            token:'T1==cGFydG5lcl9pZD00NTI1NDI2MiZzaWc9OGNkN2IzM2UwOWM0YzQxZmJmYWFmZDJiOTRlOGFlYjFhMGJmZDI5NDpzZXNzaW9uX2lkPTFfTVg0ME5USTFOREkyTW41LU1UUXpOREUwTURFMk9EY3hOMzVWYjB4UlJrZFNRbVJ0YnpaVVIxSnllVWh2TVVoUlNqTi1mZyZjcmVhdGVfdGltZT0xNDM0MTQ3NDc4Jm5vbmNlPTAuMjc2NzkzOTg1NjI3NTkxNiZyb2xlPXB1Ymxpc2hlciZleHBpcmVfdGltZT0xNzM1NzE4NDAwMDAwJmNvbm5lY3Rpb25fZGF0YT1uYW1lJTNEYW5vbnltb3Vz'
                        }
                    },
                    {
                        title: 'Boson Epic Chat Room',
                        topic: 'This is the most epic chat room of all time',
                        privacy: 'public',
                        owner: 'brad',
                        nickname: '',
                        unreadMessages: 0,
                        numberMembers: null,
                        joined: false,
                        provider: 'OpenTok',
                        providerData: {
                            apiKey: '45254262',
                            sessionId: '1_MX40NTI1NDI2Mn5-MTQzNDE0MDE2ODcxN35Vb0xRRkdSQmRtbzZUR1JyeUhvMUhRSjN-fg',
                            token:'T1==cGFydG5lcl9pZD00NTI1NDI2MiZzaWc9OGNkN2IzM2UwOWM0YzQxZmJmYWFmZDJiOTRlOGFlYjFhMGJmZDI5NDpzZXNzaW9uX2lkPTFfTVg0ME5USTFOREkyTW41LU1UUXpOREUwTURFMk9EY3hOMzVWYjB4UlJrZFNRbVJ0YnpaVVIxSnllVWh2TVVoUlNqTi1mZyZjcmVhdGVfdGltZT0xNDM0MTQ3NDc4Jm5vbmNlPTAuMjc2NzkzOTg1NjI3NTkxNiZyb2xlPXB1Ymxpc2hlciZleHBpcmVfdGltZT0xNzM1NzE4NDAwMDAwJmNvbm5lY3Rpb25fZGF0YT1uYW1lJTNEYW5vbnltb3Vz'
                        }
                    }
                    ]
                }
            }
        },
        bind:{
            store: '{rooms}'
        }
    }],

    tbar:[{
        iconCls: 'x-fa fa-pencil',
        plain: true,
        hidden: true,
        listeners: {
            click: 'onRoomMenu'
        }
    },'->',{
        iconCls: 'x-fa fa-plus-square',
        plain: true,
        hidden: true,
        listeners: {
            click: 'onRoomMenu'
        }
    }]


});
