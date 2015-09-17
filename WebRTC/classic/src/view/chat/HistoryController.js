Ext.define('WebRTC.view.chat.HistoryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.chathistory',

    onSpecialKey: function(f,e){
        if (e.getKey() == e.ENTER && !e.shiftKey ) {
            this.chatSend();
        }
        if (e.getKey() == e.UP) {
            this.editLastMessage();
        }
    },
    chatSend: function(){
        var me = this,
            chat,
            store = this.getViewModel().getStore('messages'),
            list = me.lookupReference('historylist'),
            timestamp = new Date().toISOString(),
            user = me.getViewModel().get('user'),
            name = user['name'],
            userid = user['id'],
            roomid = me.getViewModel().get('id'),
            sessionId = this.getViewModel().get('room.sessionId'),
            message = me.lookupReference('chattext');

        chat = Ext.create('WebRTC.model.chat.Message',{
            message: message.getValue(),
            roomid: roomid,
            mine: true,
            userid: userid,
            from: name,
            date: timestamp
        });

        message.focus(false,200);
        message.setValue('');

        store.add(chat);
        list.scrollBy(0, 999999, true);

        me.fireEvent('chatmessage', sessionId, chat.data);
    },

    editLastMessage: function(){
        var me = this,
            user = me.getViewModel().get('user'),
            editWindow,
            myLastMessage;

        me.getViewModel().get('mymessages').filterBy(function(record){
            if(record.get('userid') == user['id']){
                myLastMessage = record;
                return true;
            }else{
                return false;
            }
        });

        editWindow = Ext.create('Ext.window.Window',{
            title: 'Edit Last Message',
            minWidth: 500,
            minHeight: 50,
            bodyPadding: 10,
            resizable: true,
            layout: 'fit',
            viewModel:{
                data:{
                    message: myLastMessage
                }
            },
            items: [{
                xtype     : 'textareafield',
                grow      : true,
                name      : 'message',
                fieldLabel: 'Message',
                labelAlign: 'top',
                value: myLastMessage.data.message,
                anchor    : '100%'
            }],
            bbar:[{
                iconCls: 'x-fa fa-thumbs-o-down',
                action:'cancel',
                hidden: true,
                text:'Cancel'
            }
                ,'->',
                {
                    iconCls: 'x-fa fa-thumbs-o-up',
                    reference: 'okButton',
                    action:'ok',
                    formBind: true,
                    handler: 'onEditOkClick',
                    text:'OK'
                }]
        });

        me.getView().add(editWindow);
        editWindow.show();
    },

    onEditOkClick: function(button){
        debugger;

        var window = button.up('window'),
            form = window.down('form');
        if (form.isValid()) {

        }
    }

});