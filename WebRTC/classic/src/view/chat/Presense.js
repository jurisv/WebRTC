Ext.define('WebRTC.view.chat.Presense', {
    extend: 'Ext.Panel',
    xtype: 'chatpresense',
    controller: 'chatpresense',
    bodyPadding: 10,
    layout:'fit',
    viewModel: 'presense',
    items:[{
        xtype:'dataview',
        autoScroll: true,
        loadMask: false,
        bind:{
            store: '{presenseusers}'
        },
        itemSelector: 'tr.member-wrap',
        listeners: {
            itemdblclick: 'onDblClick'

        },
        tpl: [
            '<table class="members">',
            '<tpl for=".">',
            '<tr class="member-wrap">',
            '<td >',
            '{[this.getIcon(values.status)]} {fn} {[this.getMoment(values.lastActivity)]} {[this.getMood(values.status_msg)]}',
            '</td>',
            '</tr>',
            '</tpl>',
            '</table>',
            {
                getIcon: function(data){
                    if(data == 'idle'){
                        return '<span class="x-fa fa-minus-circle orange" title="idle"></span>';
                    }else if(data == 'online'){
                        return '<span class="x-fa fa-circle green" title="online"></span>'
                    }else if(data == 'busy'){
                        return '<span class="x-fa fa-circle red" title="busy"></span>'
                    }else if(data == 'broadcasting'){
                        return '<span class="x-fa fa-video-camera green" title="broadcasting"></span>'
                    }else if(data == 'temp'){
                        return '<span class="x-fa fa-unlock orange" title="temporary account"></span>'
                    }else{
                        return '<span class="x-fa fa-circle-thin" title="offline"></span>'
                    }
                },
                getMoment: function(data){
                    if(data){
                        return '' //moment(data, "YYYYMMDD").fromNow();
                    }else{
                        return ''
                    }
                },
                getMood: function(data){
                    if(data){
                        return '<br /><span class="mood-message">' + data + '</span>';
                    }else{
                        return ''
                    }
                }
            }
        ]
    }]


});
