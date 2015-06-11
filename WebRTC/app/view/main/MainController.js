/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('WebRTC.view.main.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main',

    init: function() {
         var me = this;

         Ext.Msg.prompt('Username','Please enter your name',function(buttonId,value){
            if(value) {
                //set the persons name
                me.getViewModel().set('name', value);
                me.getOTGlobalSession();
            }
         });
    },

    getOTGlobalSession: function(){
        var me=this;
        //get the global TokBox session
         Ext.Ajax.request({
            url: '/data/global/',
            params: {
                role: 'publisher',
                name: me.getViewModel().get('name')
            },
            success: function(response){
               //set session info on default room
               me.getView().down('chatroom').getViewModel().set('otSessionInfo', JSON.parse(response.responseText));
            }
        });
    },

    onItemSelected: function (sender, record) {
        Ext.Msg.confirm('Confirm', 'Open a private chat with ' + record.get('name') + '?', 'onConfirm', this);
    },

    onConfirm: function (choice) {
        if (choice === 'yes') {
            //
        }
    }
});
