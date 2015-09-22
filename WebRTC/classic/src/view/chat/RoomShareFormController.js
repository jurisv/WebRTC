Ext.define('WebRTC.view.chat.RoomShareFormController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.chatroomshareform',


    onInviteClick: function(button) {
        var me = this,
            window = button.up('window'),
            form = window.down('form'),
            data = form.getValues(),
            room = window.getViewModel().get('theRoom'),
            roomId = window.getViewModel().get('theRoom')['id'],
            message = window.getViewModel().get('theMessage'),
            token = window.getViewModel().get('theToken'),
            user = Ext.first('chatroomscontainer').getViewModel().get('user');

        if (form.isValid()) {
            console.log(data);
            form.down('[name=email]').setValue('');
            Ext.Msg.wait('Inviting', 'Sending invitation...');
            Ext.Ajax.request({
                url: '/data/roominvite/' + roomId,
                params : {
                    user: JSON.stringify(user),
                    email: data,
                    room: JSON.stringify(room.data),
                    message: message,
                    token: token
                },
                success: function(response, opts) {
                    var obj = Ext.decode(response.responseText),
                        message = obj.data[0]['message'];
                    Ext.Msg.hide();
                    me.updateStatus(window, message );
                },

                failure: function(response, opts) {
                    Ext.Msg.hide();
                    me.updateStatus(window,'Failure with status code ' + response.status);
                    console.log('server-side failure with status code ' + response.status);
                }
            });
        }
    },

    updateStatus: function(window,text){
        var statusLabel =  window.down('[reference=statusLabel]');
        if(statusLabel){
            statusLabel.setText(text);
            statusLabel.show();
        }
    },

    onOkClick: function(button) {
       button.up('window').close();
    }

});