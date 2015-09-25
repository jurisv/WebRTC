Ext.define('WebRTC.view.chat.MembersController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.chatmembers',
    listen: {
        controller: {
            'auth': {
                visibilityChanged: 'onVisibilityChanged',
                idle: 'onIdle',
                active: 'onActive'
            }
        }
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
