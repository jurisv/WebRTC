Ext.define('WebRTC.view.chat.ChatRoomController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.chatroom',



    onMemberConnect: function(){},

    onMemberDisconnect: function(){},

    onReceivedChat: function(){},

    onSpecialKey: function(f,e){
        if (e.getKey() == e.ENTER) {
            this.sendChat();
        }
        if (e.getKey() == e.UP) {
            alert('edit last')
        }
    },

    sendChat: function(){
        var me = this,
            chat,
            list = me.lookupReference('historylist'),
            timestamp = new Date().getUTCMilliseconds(),
            provider = me.getViewModel().get('provider'),
            room = me.getViewModel().get('roomInfo'),
            name = Ext.util.Cookies.get('user'),
            id = provider + timestamp,
            message = me.lookupReference('chattext');

        chat = {
            message: message.getValue(),
            provider: provider,
            id: id,
            room: room
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
    }

});
