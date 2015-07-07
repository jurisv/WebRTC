Ext.define('WebRTC.view.main.Viewport', {
    extend: 'Ext.panel.Panel',
    xtype: 'app-main',

    requires: [
        'Ext.plugin.Viewport',
        'Ext.window.MessageBox'
    ],

    controller: 'main',
    viewModel: 'main',

    flex: 1,
    layout: {
        type: 'hbox',
        align: 'stretch'
    },

    items: [{
        //title:'Left Side',
        flex: 1,
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        items:[
            {
                xtype: 'tabpanel',
                flex:1,
                items:[{
                    title: 'Users'
                },{
                    title: 'Rooms',
                    xtype:'dataview',
                    itemSelector: 'div.thumb-wrap',
                    tpl: [
                    '<tpl for=".">',
                    '<div style="margin-bottom: 10px;" class="thumb-wrap">',
                    '{title}',
                    '<br/><span>{description}</span>',
                    '</div>',
                    '</tpl>'
                    ],

                    viewModel : {
                        stores: {
                            rooms: {
                                data: [{
                                    title: 'Boson Epic Chat Room',
                                    description: 'This is the most epic chat room of all time'
                                }]
                            }
                        }
                    },
                    bind:{
                        store: '{rooms}'
                    }
                }]
            },
            {
                xtype: 'tabpanel',
                flex:1,
                items:[{
                    title: 'Chat'
                },{
                    title: 'Files'
                }]
            }
        ]
    },{
        //title: 'Right Side',
        flex: 4,
        bodyPadding: 25,
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        items:[{
            // title:'roomheader',
            viewModel : {
                data: {
                    room: {
                        title :'Boson Epic Chat Room',
                        description: 'This is the most epic chat room of all time'
                    }
                }
            },
            bind : {
                data : '{room}'
            },
            tpl: [
                '<div class="room-data">',
                '<h1 class="room-title"><span class="x-fa fa-group"></span> {title}</h1>',
                '<h4 class="room-description">{description}&nbsp;</h4>',
                '</div>'
            ],
            flex: 1
        },{
            // title:'mainvideo',
            viewModel : {
                data: {
                    video: {
                        title :'Marie Curie',
                        height: 500,
                        width: 800,
                        volume: .2,
                        muted: false
                    }
                }
            },
            bind : {
                data : '{video}'
            },
            tpl: [
                '<video autoplay  id="mainVideo" height="{height}" width="{width}"></video>',
                '<div class="title">{title}</div>'
            ],
            flex: 3
        },{
            //title:'othervideo',
            flex: 1,
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items:[{
                title:'roomvideos',
                flex: 4

            },{
                title:'myvideo',
                flex: 1

            }]
        }]
    }

    /*{
        title: 'Home',
        iconCls: 'fa-home',
        // The following grid shares a store with the classic version's grid as well!
        items: [{
            xtype: 'video',
            x: 600,
            y: 300,
            width: 175,
            height: 98,
            url: "porsche911.mov",
            posterUrl: 'porsche.png'
        },{
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
    }*/

    ]
});
