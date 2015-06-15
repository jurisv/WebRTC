Ext.define('WebRTC.view.chat.ChatRoom', {
    extend: 'Ext.form.Panel',
    requires: [
      'WebRTC.view.chat.ChatRoomModel',
      'WebRTC.view.chat.ChatRoomController'
    ],
    xtype: 'chatroom',
    layout: 'border',

    controller : 'chatroom',
    viewModel: 'chatroom',

    items: [{
        title: 'History',
        region:'center',
        reference: 'history',
        bodyPadding: 20,
        xtype:'grid',
        layout:'fit',
        hideHeaders: true,
        bind: {
            store: '{roommessages}'
        },
        columns: [
            { text: 'From', flex:1, dataIndex: 'from' },
            { text: 'Message', flex:3, dataIndex: 'message' }
        ]
    },{
        title: 'Users',
        region:'east',
        width: '40%',
        hidden: false,
        split:true,
        collapsible: true,
        collasped:false,
        xtype:'grid',
        layout:'fit',
        hideHeaders: true,
        bind:{
            store: '{members}'
        },
        columns: [
            { text: 'Name',  dataIndex: 'name', flex: 1, minWidth:50 },
            { text: 'Broadcasting', dataIndex: 'publishing'}
        ]
    }],

    bbar:[{
        xtype:'textfield',
        name:'text',
        reference: 'chattext',
        listeners: {
          specialkey: function(f,e){
            if (e.getKey() == e.ENTER) {
                myButton = this.up().down('button');
                myButton.fireEvent('click', myButton);
            }
            if (e.getKey() == e.UP) {
                alert('edit last')
            }
          }
        },
       width:'90%'
    },'->',{
        text:'send',
        listeners: {
            click: 'onChatSend'
        }
    }],

    listeners: {
       show: 'onRoomShow',
       hide: 'onRoomHide'
    }
});
