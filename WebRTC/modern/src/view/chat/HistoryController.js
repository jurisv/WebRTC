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
        me.scrollToBottom();

        me.fireEvent('chatmessage', sessionId, chat.data);
    },

    scrollToBottom: function(){
        var list = this.getView().down('dataview[reference=historylist]');
        if(list) {
            //this is deferred to ensure the data has loaded from firebase and knows the amount of records
            Ext.Function.defer(function () {
                    list.scrollBy(0, 999999, true);
            },
            500);
        }
    },

    onDblClick: function(view,record,item){
        var me = this,
            user = me.getViewModel().get('user');

        if(record.get('userid') == user['id']){
            me.editMessage(record);
        }
    },

    editMessage: function(record){
        var me = this,
            editWindow;

        record.set('edited',true);

        editWindow = Ext.create('Ext.window.Window',{
            title: 'Edit Message',
            minWidth: 500,
            minHeight: 50,
            bodyPadding: 10,
            resizable: true,
            layout: 'fit',
            /*
             * Seek out the first enabled, focusable, empty textfield when the form is focused
             */
            defaultFocus: 'textfield:focusable:not([hidden]):not([disabled]):not([value])',

            viewModel:{
                data:{
                    theMessage: record
                }
            },
            items: [{
                xtype     : 'textareafield',
                grow      : true,
                name      : 'message',
                fieldLabel: 'Message',
                labelAlign: 'top',
                bind: {
                    value: '{theMessage.message}'
                },
                anchor    : '100%'
            }]
        });
        me.getView().insert(0,editWindow);
        editWindow.show();
    },

    editLastMessage: function(){
        var me = this,
            user = me.getViewModel().get('user'),
            theRecord;

        me.getViewModel().get('mymessages').filterBy(function(record){
            if(record.get('userid') == user['id']){
                theRecord = record;
                return true;
            }else{
                return false;
            }
        });

        me.editMessage(theRecord);

    },

    onEditOkClick: function(button){
       //debugger;

        var window = button.up('window'),
            form = window.down('form');
        if (form.isValid()) {
            window.getViewModel().get('message').save();
        }
    }

});