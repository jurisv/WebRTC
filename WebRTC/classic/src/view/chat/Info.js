Ext.define('WebRTC.view.chat.Info', {
    extend: 'Ext.Panel',
    xtype: 'chatinfo',

    bind : {
        data : '{room}'
    },
    tpl: [
        '<div class="room-data">',
        '<div class="room-title" style="font-size:24px;margin-top:10px;"><span class="x-fa fa-group fa-lg"></span> {name}</div>',
        '<div class="room-description" style="margin-left:42px;">{description}&nbsp;</div>',
        '</div>'
    ]

});