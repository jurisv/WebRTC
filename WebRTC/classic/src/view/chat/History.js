Ext.define('WebRTC.view.chat.History', {
    extend: 'Ext.Panel',
    xtype: 'chathistory',

    bodyPadding: 10,
    layout:'fit',

    items: [{
        xtype: 'dataview',
        reference: 'historylist',
        autoScroll: true,
        viewModel:{
            stores: {
                messages: {
                    model:'WebRTC.model.RoomMessage',
                    autoLoad: true
                }
            }
        },
        bind: {
            store: '{messages}'
        },
        itemSelector: 'div.chat-wrap',
        tpl: [
            '<table cellspacing="0" cellpadding="8" width="100%">',
            '<tpl for=".">',
            '<tr>',
            '<td width="125" style="font-weight:100;border-bottom: solid 1px #eee;">',
            '{from}',
            '</td><td style="font-weight:400;border-bottom: solid 1px #eee;">',
            '{message}',
            '</td><td width="100" style="font-weight:400;border-bottom: solid 1px #eee;text-align:right;">',
            '{time:date("g:i A")}',
            '</td>',
            '</tr>',
            '</tpl>',
            '</table>'

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
            click: 'chatSend'
        }
    }]

});
