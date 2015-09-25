Ext.define('WebRTC.view.chat.PresenseController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.chatpresense',
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
        var userId = WebRTC.app.getController('Auth').user['id'];
        if(userId == record.get('id')){
            this.fireEvent('openUser');
        }
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
            usersRef = auth.firebaseRef.child('users/' + userId);

        usersRef.update(status);
    }


});
