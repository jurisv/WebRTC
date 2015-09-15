Ext.define('WebRTC.view.chat.RoomsList', {
    extend: 'Ext.Panel',
    xtype: 'chatroomslist',
    autoScroll: true,
    bodyPadding: 10,
    viewModel: {
        type: 'chatroomscontainer'
    },
    controller: 'chatroomscontainer',
    items:[{
        xtype: 'dataview',
        itemSelector: 'div.room-wrap',
        tpl: [
            '<tpl for=".">',
            '<div style="margin-bottom: 10px;" class="room-wrap">',
            '{name}',
            // '<br/><span>{description}</span>',
            '</div>',
            '</tpl>'
        ],
        bind:{
            store: '{rooms}'
        },
        listeners: {
            select : 'onRoomSelect'
        }
    }]

});
