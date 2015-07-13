Ext.define('WebRTC.view.chat.VideoWall', {
    extend: 'Ext.Panel',
    xtype: 'chatvideowall',

    items: [{
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        items:[{
            xtype: 'container',
            height: 300,
            width: 800,
            reference: 'them',
            id: 'them',
            viewModel : {
                data: {
                    video: {
                        title : null,
                        id: 'speaker',
                        height: 300,
                        width: 800,
                        volume: .2,
                        muted: false
                    }
                }
            }
        },{
            flex: 1,
            bodyPadding: 10,
            minHeight: 200,
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items:[{
                flex: 3,

                xtype: 'container'
                 /*layout: {
                    type: 'hbox'
                }*/
             /*   items:[
                {
                    xtype: 'tokboxVideo',
                    // hidden: true,
                    width: 110,
                    viewModel : {
                        data: {
                            video: {
                                title :'Albert',
                                id: 'albert',
                                height: 100,
                                width: 100,
                                volume: .2,
                                muted: false
                            }
                        }
                    }

                },{
                    xtype: 'tokboxVideo',
                   //  hidden: true,
                    width: 110,
                    viewModel : {
                        data: {
                            video: {
                                title :'Sir Isaac',
                                id: 'isaac',
                                height: 100,
                                width: 100,
                                volume: .2,
                                muted: false
                            }
                        }
                    }
                }]*/
            },{
                // title:'myvideo',
                id: 'you',
                reference: 'you',
                xtype: 'tokboxVideo',
                height: 200,
                width: 300,
                // hidden: true,
                viewModel : {
                    data: {
                        video: {
                            title :'You',
                            id: 'you',
                            height: 100,
                            width: 300,
                            volume: .2,
                            muted: false
                        }
                    }
                }


            }]
        }]
    }],

    tbar:[{
        iconCls: 'x-fa fa-video-camera',
        plain: true,
        listeners: {
            click: 'onPublishToggle'
        }
    },'->'
    ]
});