Ext.define('WebRTC.view.chat.Presense', {
    extend: 'Ext.Panel',
    xtype: 'chatpresense',
    controller: 'chatpresense',
    bodyPadding: 10,
    layout:'fit',

    items:[{
        xtype:'dataview',
        autoScroll: true,
        loadMask: false,
        bind:{
            store: '{users}'
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
                        return '<span class="x-fa fa-minus-circle orange"></span>';
                    }else if(data == 'online'){
                        return '<span class="x-fa fa-circle green"></span>'
                    }else if(data == 'busy'){
                        return '<span class="x-fa fa-circle red"></span>'
                    }else if(data == 'broadcasting'){
                        return '<span class="x-fa fa-video-camera green"></span>'
                    }else{
                        return '<span class="x-fa fa-circle-thin"></span>'
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
