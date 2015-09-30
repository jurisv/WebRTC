Ext.define('WebRTC.view.chat.PresenseController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.chatpresense',

    listen: {
        controller: {
            '*': {
                closeroom: 'onCloseRoom',
                joinroom: 'onJoinRoom'
            }
        }
    },

    onCloseRoom: function(tab, room, user){
        var auth = WebRTC.app.getController('Auth'),
            usersRef = auth.firebaseRef.child('users/' + user['id']);

        usersRef.update({
            status: 'online',
            statusOrder: 100
        });

        console.log('presense | room closed')
    },

    onJoinRoom: function(tab, room, user){
        var auth = WebRTC.app.getController('Auth'),
            usersRef = auth.firebaseRef.child('users/' + user['id']);

        usersRef.update({
            status: 'online',
            statusOrder: 100
        });

        console.log('presense | room joined')
    },

    onDblClick: function(list, record ){
        var userId = this.getViewModel().get('user')['id'];
        if(userId == record.get('id')){
            this.fireEvent('openUser');
        }
    }
});
