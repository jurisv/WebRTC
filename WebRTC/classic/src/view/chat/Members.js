Ext.define('WebRTC.view.chat.Members', {
    extend: 'Ext.Panel',
    xtype: 'chatmembers',
    autoScroll: true,
    bodyPadding: 10,

    items:[{
        xtype:'dataview',

        viewModel:{
            data: {
                provider: 'webRTC',   //values supported : webRTC, websockets
                roomInfo: null
            },
            stores: {
                members: {
                    // model:'WebRTC.model.RoomMember',
                    // autoLoad: true,
                    data: [{
                        name: 'Moderator',
                        publishing: false
                    }]
                }
            }
        },

        bind:{
            store: '{members}'
        },

        itemSelector: 'div.member-wrap',
        tpl: [
            '<tpl for=".">',
            '<div style="margin-bottom: 10px;" class="member-wrap">',
            '<span class="x-fa fa-user" title="{name}"> </span> {name}',
            '<br/>',
            '</div>',
            '</tpl>'
        ]
    }]


});
