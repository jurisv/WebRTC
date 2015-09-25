Ext.define('WebRTC.view.chat.PresenseController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.chatpresense',


    onDblClick: function(list,record){
        var userId = WebRTC.app.getController('Auth').user['id'];
        if(userId == record.get('id')){
            this.fireEvent('openUser');
        }
    }
});
