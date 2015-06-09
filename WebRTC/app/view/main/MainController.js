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
         //get the global TokBox session
         Ext.Ajax.request({
            url: '/data/global/',
            params: {
                id: 1
            },
            success: function(response){
                var session = response.responseText;

                //set the global session
                me.getViewModel().set('globalSession',session);
            }
        });
    },

    onItemSelected: function (sender, record) {
        Ext.Msg.confirm('Confirm', 'Are you sure?', 'onConfirm', this);
    },

    onConfirm: function (choice) {
        if (choice === 'yes') {
            //
        }
    }
});
