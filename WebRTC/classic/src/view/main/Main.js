Ext.define('WebRTC.view.main.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'app-main',

    requires: [
        'Ext.plugin.Viewport',
        'Ext.window.MessageBox',

        'WebRTC.view.main.MainController',
        'WebRTC.view.main.MainModel',
        'WebRTC.view.main.List',

        'WebRTC.view.videoroom.VideoRoom',
        'WebRTC.view.chat.ChatRoom'

    ],

    controller: 'main',
    viewModel: 'main',

    ui: 'navigation',

    deferredRender: false,
    tabBarHeaderPosition: 1,
    titleRotation: 0,
    tabRotation: 0,
    // activeTab: 2,

    header: {
        layout: {
            align: 'stretchmax'
        },
        title: {
            bind: {
                text: '{appName}'
            },
            flex: 0
        },
        iconCls: 'fa-th-list'
    },

    tabBar: {
        flex: 1,
        layout: {
            align: 'stretch',
            overflowHandler: 'none'
        }
    },

    responsiveConfig: {
        tall: {
            headerPosition: 'top'
        },
        wide: {
            headerPosition: 'left'
        }
    },

    defaults: {
        bodyPadding: 20,
        tabConfig: {
            plugins: 'responsive',
            responsiveConfig: {
                wide: {
                    iconAlign: 'left',
                    textAlign: 'left'
                },
                tall: {
                    iconAlign: 'top',
                    textAlign: 'center',
                    width: 120
                }
            }
        }
    },

    items: [{
        title: 'Home',
        iconCls: 'fa-home',
        // The following grid shares a store with the classic version's grid as well!
        items: [{
            html: '<h1>Peer to Peer Chat/Video with OpenTok</h1><img src="//tokbox.com/developer/img/docs/architecture_v2.jpg" style="width:100%" />'
        }]
    },{
        title: 'UserMedia',
        iconCls: 'fa-user',
        layout: 'center',
        hidden: true,
        items: [{
            // xtype: 'UserMedia',
            width: 640,
            height: 480

        }]
    }, {
        title: 'Video',
        iconCls: 'fa-users',
        openTokParams: {
            apiKey: '45254262',
            sessionId: '1_MX40NTI1NDI2Mn5-MTQzMzk1NTY3NDMyMn5Xd0FpdUFYSEdFaVUwaVY4M3ZTS3RyT2p-UH4',
            token:'T1==cGFydG5lcl9pZD00NTI1NDI2MiZzaWc9OGY3MGJlNWI5ODFmOTFiZGFiODI0MzRmMTExZDAzMDM0ZDUyYmExZjpzZXNzaW9uX2lkPTFfTVg0ME5USTFOREkyTW41LU1UUXpNemsxTlRZM05ETXlNbjVYZDBGcGRVRllTRWRGYVZVd2FWWTRNM1pUUzNSeVQycC1VSDQmY3JlYXRlX3RpbWU9MTQzNDE0NzQzMSZub25jZT0wLjY1OTcxNDY5MzIwMzU2ODUmcm9sZT1wdWJsaXNoZXImZXhwaXJlX3RpbWU9MTczNTcxODQwMDAwMCZjb25uZWN0aW9uX2RhdGE9bmFtZSUzRGFub255bW91cw=='
        },
        xtype: 'videoroom'
    },{
        title: 'Chat',
        iconCls: 'fa-comments',
        openTokParams: {
            apiKey: '45254262',
            sessionId: '1_MX40NTI1NDI2Mn5-MTQzNDE0MDE2ODcxN35Vb0xRRkdSQmRtbzZUR1JyeUhvMUhRSjN-fg',
            token:'T1==cGFydG5lcl9pZD00NTI1NDI2MiZzaWc9OGNkN2IzM2UwOWM0YzQxZmJmYWFmZDJiOTRlOGFlYjFhMGJmZDI5NDpzZXNzaW9uX2lkPTFfTVg0ME5USTFOREkyTW41LU1UUXpOREUwTURFMk9EY3hOMzVWYjB4UlJrZFNRbVJ0YnpaVVIxSnllVWh2TVVoUlNqTi1mZyZjcmVhdGVfdGltZT0xNDM0MTQ3NDc4Jm5vbmNlPTAuMjc2NzkzOTg1NjI3NTkxNiZyb2xlPXB1Ymxpc2hlciZleHBpcmVfdGltZT0xNzM1NzE4NDAwMDAwJmNvbm5lY3Rpb25fZGF0YT1uYW1lJTNEYW5vbnltb3Vz'
        },
        xtype: 'chatroom'
    }]
});
