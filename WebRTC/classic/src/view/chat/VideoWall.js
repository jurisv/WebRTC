Ext.define('WebRTC.view.chat.VideoWall', {
    extend: 'Ext.Panel',
    xtype: 'chatvideowall',

    items: [{
        flex: 3,
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        items:[{
            xtype: 'tokboxVideo',
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
            flex: 3
        },{
            flex: 1,
            bodyPadding: 10,
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items:[{
                flex: 3,
                layout: {
                    type: 'hbox'
                },
                items:[{
                    xtype: 'tokboxVideo',
                    width: 110,
                    viewModel : {
                        data: {
                            video: {
                                title :'Ablert',
                                height: 100,
                                width: 100,
                                volume: .2,
                                muted: false
                            }
                        }
                    }

                },{
                    xtype: 'tokboxVideo',
                    width: 110,
                    viewModel : {
                        data: {
                            video: {
                                title :'Sir Isaac',
                                height: 100,
                                width: 100,
                                volume: .2,
                                muted: false
                            }
                        }
                    }
                }]
            },{
                // title:'myvideo',
                xtype: 'tokboxVideo',
                viewModel : {
                    data: {
                        video: {
                            title :'You',
                            height: 100,
                            width: 100,
                            volume: .2,
                            muted: false
                        }
                    }
                },
                flex: 1

            }]
        }]
    }]
});