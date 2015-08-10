/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('WebRTC.view.main.ViewportController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.viewport',
    mixins: ['WebRTC.OpenTokMixin'],

    listen: {
        controller: {
            'opentok': {
                chatreceived : 'onOTChatReceived',
                connectioncreated : 'onOTConnectionCreated',
                connectiondestroyed : 'onOTConnectionDestroyed',
                streamcreated : 'onOTStreamCreated',
                streamdestroyed : 'onOTStreamDestroyed',
                sessionconnected : 'onOTSessionConnected',
                sessiondisconnect : 'onOTSessionDestroyed'
            }
        },
        component:{
            'chatroomform button[action=ok]':{
              //  click: 'onRoomFormOkClick'
            },
            'chatroom':{
               // beforeclose: 'onRoomClose'
            },
            'settingsadmin button[action=ok]':{
                //click: 'onSettingsAdminOkClick'
            }
        }
    },

    init: function() {
         var me = this;
        me.checkSetup()
    },

    onShow: function(){
        Ext.Viewport.setMenu(this.createMenu(),{
            side: 'left',
            reveal: true
        });
    },


    checkSetup: function(){
        var me= this,
            settings;

        //Theres only one setting but the REST API needs and id.
        WebRTC.model.AdminSettings.load(0,{
            success: function(record,operation){
                if( !record.get('otApiKey') ){
                    me.onSettingsAdminSelect();
                }else{
                    me.authenticate();
                }
            }
        });

    },

    authenticate: function(){
        var me = this,
            userStore = new Ext.util.LocalStorage({
                id: 'userStorage'
            }),
            user,
            store = Ext.create('Ext.data.Store',{
                model: 'WebRTC.model.User',
                autoLoad: true
            });

        // Use this area to run function to launch screen instantly
        // this.onSettingsUserSelect();
        // return;

        if (Ext.browser.is.Safari  || Ext.browser.is.IE ) {
            Ext.toast({
                html: 'We recommend Chrome for the best experience.',
                title: 'Unsupported',
                width: 400,
                align: 't'
            });
            this.disable();
            return true;
        }

        if(!userStore.getItem('user')){
            Ext.Msg.prompt('Username','Please enter your name',function(buttonId,value){
                if(value) {
                    //set the persons name
                    var expires = new Date("October 13, 2095 11:13:00"),
                        newUser = Ext.create('WebRTC.model.User',{
                            name: value
                        });

                    newUser.save();


                    me.getViewModel().set('name', newUser.get('name') );

                    me.getViewModel().set('user', newUser);

                    userStore.clear();
                    userStore.setItem('user', JSON.stringify( newUser.data ) );

                    //Ext.util.Cookies.set('user', JSON.stringify( newUser.data ) , expires);

                    /*  Ext.toast({
                     html: newUser + ' give us a moment while we set things up.',
                     title: 'Welcome',
                     width: 400,
                     align: 't'
                     });
                     */

                    Ext.defer(function() {
                       // me.selectFirstRoom();
                    }, 1200);

                }
            });
        }else{
            user =  JSON.parse(userStore.getItem('user')) ;
            me.getViewModel().set('user', user);

            me.getViewModel().set('name', user.name );

            /* Ext.toast({
             html: 'Glad to see you again ' + user.data.name  + '.',
             title: 'Welcome Back',
             width: 400,
             align: 't'
             });*/

            Ext.defer(function() {
               // me.selectFirstRoom();
            }, 1200);

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
    },

    onHamburgerClick: function(){
            if(Ext.Viewport.getMenus().left.isHidden()){
                Ext.Viewport.showMenu('left');
            }
            else
            {
                Ext.Viewport.hideMenu('left');
            }

    },

    createMenu: function(){
        var menu = Ext.create('Ext.Menu', {
            width: 250,
            scrollable: 'vertical',
            items: [
                {
                    xtype: 'button',
                    text: 'Join Room',
                    handler: function(){
                        console.log("Join Room Tapped");
                    }
                },{
                    xtype: 'button',
                    text: 'Toggle Camera',
                    handler: function(){
                        console.log("Toggle Camera Tapped");
                    }
                },
                {
                    xtype: 'button',
                    text: 'Toggle Microphone',
                    handler: function(){
                        console.log("Toggle Microphone Tapped");
                    }
                }
            ]
        });
        return menu;
    },



    onRoomSelect: function(view,record) {

        if (!record) return false;

        var me = this,
            navView = me.getView(),
            id = record.get('id'),
            name = me.getViewModel().get('name'),
            room;


        room = Ext.create({
            xtype: 'chatroom',
            closable: true,
            iconCls: 'x-fa fa-comments',
            roomId: id,
            flex: 1
        });

        navView.push(room);

        room.getViewModel().set('room', record);
        room.getViewModel().getStore('messages').getProxy().getExtraParams().room = id;

        // Notify TokBox in this case
        me.fireEvent('joinroom', room, record.data, name);



    }
});
