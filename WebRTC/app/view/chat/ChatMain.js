Ext.define('WebRTC.view.chat.ChatMain', {
    extend: 'Ext.form.Panel',
    requires: [
        'WebRTC.view.chat.ChatController',
        'WebRTC.store.Messages'
    ],
    xtype: 'chatmain',
    layout: 'border',

    controller : 'chat',

    items: [{
        title: 'Users',
        region:'east',
        width: '20%',
        split:true,
        collapsible: true,
        collasped:false
    }, {
        title: 'History',
        region:'center',
        reference: 'history',
        bodyPadding: 20,
        xtype:'grid',
        layout:'fit',
        hideHeaders: true,
        store: {
            type: 'messages'
        },

        columns: [
            { text: 'Message', flex:1, dataIndex: 'message' }
        ]
    }],

    bbar:[{
        xtype:'textfield',
        name:'text',
        width:'80%'
    },
        '->',{
            text:'send',
            handler: 'onSend'
    }]
});
