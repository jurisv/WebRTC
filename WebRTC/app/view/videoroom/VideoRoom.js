Ext.define('WebRTC.view.videoroom.VideoRoom', {
    extend: 'Ext.form.Panel',
    requires: [
        'WebRTC.view.videoroom.VideoRoomModel',
        'WebRTC.view.videoroom.VideoRoomController'
    ],
    xtype: 'videoroom',
    layout: 'border',

    controller: 'videoroom',
    viewModel: 'videoroom',

    items: [{
        xtype: 'panel',
        bind: {
            title: '{name}'
        },
        items:{
            xtype:'container',
            layout:'center',
            itemId: 'publisher'
        },
        region: 'west',
        width: 400
    },{
        xtype: 'panel',
        items:{
            xtype:'container',
            layout:'center',
            itemId: 'subscribers'
        },
        autoScroll: true,
        flex: 1,
        // split:true,
        // collapsible: true,
        // collasped:false,
        region: 'center'
    }],

    listeners:{
        show: 'onRoomShow',
        hide: 'onRoomHide'
    }
});