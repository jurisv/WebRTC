Ext.define('WebRTC.view.chat.VideoWall', {
    extend: 'Ext.Panel',
    xtype: 'chatvideowall',

    requires: ['Ext.media.Video'],

    items: [{
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        items:[{
            xtype: 'classic-video',
            height: 300,
            width: 800,
            itemId: 'them',
            reference: 'them',
            // id: 'them',
            volume: .2,
            muted: false

            // viewModel : {
            //     data: {
            //         video: {
            //             title : null,
            //             id: 'them',
            //             height: 300,
            //             width: 800,
            //             volume: .2,
            //             muted: false
            //         }
            //     }
            // }
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
                //id: 'you',
                reference: 'you',
                // xtype: 'tokboxVideo',
                xtype: 'classic-video',
                height: 200,
                width: 300,
                volume: .2,
                muted: false
                // hidden: true,
                // viewModel : {
                //     data: {
                //         video: {
                //             title :'You',
                //             id: 'you',
                //             height: 100,
                //             width: 300,
                //             volume: .2,
                //             muted: false
                //         }
                //     }
                // }


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