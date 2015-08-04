Ext.define('WebRTC.view.chat.History', {
    extend: 'Ext.Panel',
    xtype: 'chathistory',

    bodyPadding: 10,
    layout:'fit',

    items: [{
        xtype: 'dataview',
        loadMask: false,
        reference: 'historylist',
        autoScroll: true,
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
            // '{message}',
            '{[this.formatMessage(values.message)]}',
            '</td><td width="100" style="font-weight:400;border-bottom: solid 1px #eee;text-align:right;">',
            '{shortDate}',
            '</td>',
            '</tr>',
            '</tpl>',
            '</table>',
            {
                formatMessage: function (message) {
                    var matcher = /(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)/ig;
                    
                    function anchorTag(match) {
                        var url = match;
                        if (!Ext.String.startsWith(match, 'http', true)) {
                            url = 'http://'+match;
                        }

                        return '<a href='+url+' target="_blank">'+match+'</a>'
                    }

                    return message.replace(matcher, anchorTag);
                }
            }
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
