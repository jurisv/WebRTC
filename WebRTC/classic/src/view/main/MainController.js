/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('WebRTC.src.view.main.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main',

    init: function() {
         var me = this,
             user = Ext.util.Cookies.get('user');

         if(!user){
             Ext.Msg.prompt('Username','Please enter your name',function(buttonId,value){
                 if(value) {
                     //set the persons name
                     var expires = new Date("October 13, 2095 11:13:00"),
                         newUser = {
                         username: value

                     };
                     me.getViewModel().set('name', value);
                     Ext.util.Cookies.set('user',newUser, expires);
                     me.getOTGlobalSession();
                 }
             });
         }


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
               var sessionInfo = JSON.parse(response.responseText);
               me.getView().down('chatroom').getViewModel().set('otSessionInfo', sessionInfo );
            }
        });
        Ext.Ajax.request({
            url: '/data/token/1_MX40NTI1NDI2Mn5-MTQzMzk1NTY3NDMyMn5Xd0FpdUFYSEdFaVUwaVY4M3ZTS3RyT2p-UH4',
            params: {
                role: 'publisher',
                name: me.getViewModel().get('name')
            },
            success: function(response){
               //set session info on video room
               var sessionInfo = JSON.parse(response.responseText);
               me.getView().down('videoroom').getViewModel().set('otSessionInfo', sessionInfo );
            }
        });
    },

    onToggleFullScreen: function () {
        if (!document.fullscreenElement &&    // alternative standard method
            !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement ) {  // current working methods
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
            } else if (document.documentElement.msRequestFullscreen) {
                document.documentElement.msRequestFullscreen();
            } else if (document.documentElement.mozRequestFullScreen) {
                document.documentElement.mozRequestFullScreen();
            } else if (document.documentElement.webkitRequestFullscreen) {
                document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }
        }
    }



});
