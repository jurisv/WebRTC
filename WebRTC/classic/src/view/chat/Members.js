Ext.define('WebRTC.view.chat.Members', {
    extend: 'Ext.Panel',
    xtype: 'chatmembers',
    autoScroll: true,
    bodyPadding: 10,
    items:[{
        xtype:'dataview',
        viewModel:{
            stores: {
                members: {
                    model:'WebRTC.model.RoomMember',
                    autoLoad: true
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
