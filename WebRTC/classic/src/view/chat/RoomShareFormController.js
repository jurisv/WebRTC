Ext.define('WebRTC.view.chat.RoomShareFormController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.chatroomshareform',


    onInviteClick: function(button) {
        var window = button.up('window'),
            form = window.down('form'),
            data = form.getValues(),
            userid = button.up('chatroomscontainer').getViewModel().get('user').id,
            store = button.up('chatroomscontainer').getViewModel().getStore('rooms');
        if (form.isValid()) {}
    },

    onOkClick: function(button) {
       button.up('window').close();
    }

});