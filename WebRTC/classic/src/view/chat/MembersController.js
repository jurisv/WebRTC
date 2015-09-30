Ext.define('WebRTC.view.chat.MembersController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.chatmembers',
    listen: {
        controller: {
            'auth': {
                visibilityChanged: 'onVisibilityChanged',
                idle: 'onIdle',
                active: 'onActive'
            },
            '*': {
                closeroom: 'onCloseRoom',
                joinroom: 'onJoinRoom'
            }
        }
    },

    onCloseRoom: function(tab,room, user){
        var auth = WebRTC.app.getController('Auth'),
            membersRef = auth.firebaseRef.child('roommembers/' + room['id'] + '/' + user['id']);

        // remove member from room
        membersRef.remove();

        console.log('members | room closed')
    },

    onJoinRoom: function(tab, room, user){
        var auth = WebRTC.app.getController('Auth'),
            membersRef = auth.firebaseRef.child('roommembers/' + room['id'] + '/' + user['id']);

        membersRef.update({
            id: user['id'],
            callStatus:'idle',
            micStatus:'',
            name: user['fn']
        });
        // when I disconnect, remove this member
        membersRef.onDisconnect().remove();
        console.log('members | room joined')
    },



    onDblClick: function(list,record){
        console.log('dble user');
    },

    onVisibilityChanged: function(){
        //var me=this;
        if(!document.hidden) {
            //me.unread = 0;
        }
        //me.setUnreadTitle();
    },

    onIdle: function(lastActivity){
        var me=this;
        if(me.isIdle){return}
        me.isIdle = true;
        me.setPresenseStatus({
            status: 'idle',
            lastActivity: lastActivity
        });
        // console.log('idle');
    },

    onActive: function(){
        var me=this;
        if(me.isIdle){
            me.isIdle = false;
            me.setPresenseStatus({
                status: 'online',
                lastActivity: null
            });
        }
        // console.log('active');
    },

    setPresenseStatus: function(status){
        var auth = WebRTC.app.getController('Auth'),
            userId = auth.user['id'],
            membersRef = auth.firebaseRef.child('roommembers/' + id + '/' + userId);

      //  console.log('room members status : ' + status);
      membersRef = auth.firebaseRef.child('roommembers/' + id + '/' + userId);
    }


});
