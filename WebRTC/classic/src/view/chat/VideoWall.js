Ext.define('WebRTC.view.chat.VideoWall', {
    extend: 'Ext.Panel',
    xtype: 'chatvideowall',
    layout: 'border',

    controller : 'chat',

    items: [{
        //title: 'Video Wall',
        region: 'center',
        flex: 3,
        bodyPadding: 25,
        // hidden: true,
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
            // xtype: 'video',
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
    }, {
        // xtype: 'panel',
        region: 'east',
        width: '40%',
        hidden: true,
        flex: 1,
        items: []
    }]
});