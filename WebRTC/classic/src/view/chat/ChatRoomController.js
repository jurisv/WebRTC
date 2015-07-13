Ext.define('WebRTC.view.chat.ChatRoomController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.chatroom',

    roomMemberAdd: function(member){
        var store = this.getView().down('chatmembers').down('dataview').getViewModel().getStore('members');
        store.add(member);
    },

    roomMemberRemove: function(id){
         var store = this.getView().down('chatmembers').down('dataview').getViewModel().getStore('members'),
         idx = store.find('id',id);

         if(idx){
            store.removeAt(idx);
         }

    },


    onSpecialKey: function(f,e){
        if (e.getKey() == e.ENTER) {
            this.chatSend();
        }
        if (e.getKey() == e.UP) {
            alert('edit last')
        }
    },

    chatReceived: function(chat){
        var store = this.getView().down('chathistory').down('dataview').getViewModel().getStore('messages');
        store.add(chat);
    },

    chatSend: function(){
        var me = this,
            chat,
            list = me.lookupReference('historylist'),
            timestamp = new Date().getUTCMilliseconds(),
            name = Ext.util.Cookies.get('user'),
            id = timestamp,
            message = me.lookupReference('chattext');

        chat = {
            message: message.getValue(),
            id: id
        };

        message.focus(false,200);
        list.store.add({
            id: id,
            message: message.getValue(),
            from: name
        });
        message.setValue('');
        list.scrollBy(0, 999999, true);

        me.fireEvent('chatmessage', me, chat);
    },


    onPublishToggle: function(){
        var you = this.lookupReference('you');
        you.show();

        this.fireEvent('initpublisher', this, you.getEl().id );

    }

});
