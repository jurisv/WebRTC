Ext.define('WebRTC.view.chat.History', {
    extend: 'Ext.Panel',
    xtype: 'chathistory',
    reference: 'history',
    controller : 'chat',
    bodyPadding: 10,
    layout:'fit',

    items: [{
        xtype: 'dataview',
        reference: 'historylist',
        autoScroll: true,
        viewModel:{
            data: {
                provider: 'webRTC',   //values supported : webRTC, websockets
                roomInfo: null
            },
            stores: {
                roommessages: {
                    model:'WebRTC.model.RoomMessage',
                    autoLoad: true
                }
            }
        },
        bind: {
            store: '{roommessages}'
        },
        itemSelector: 'div.chat-wrap',
        tpl: [
            '<tpl for=".">',
            '<div style="margin-bottom: 10px;" class="chat-wrap">',
            '<span class="x-fa fa-user" title="{from}"> </span> {message}',
            '<br/>',
            '</div>',
            '</tpl>'
        ]
    }],

    bbar:[{
        xtype:'textfield',
        name:'text',
        reference: 'chattext',
        listeners: {
            specialkey: 'onSpecialKey'
        },
        flex:1
    },{
        iconCls: 'x-fa fa-smile-o',
        plain: true,
        listeners: {
            click: 'sendChat'
        }
    }]

});
