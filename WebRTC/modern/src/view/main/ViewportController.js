/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('WebRTC.view.main.ViewportController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.viewport',
    mixins: ['opentok.OpenTokMixin'],

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
              tap: 'onRoomFormOkClick'
            },
            'app-main':{
                activeitemchange: 'onRoomClose'
            },
            'settingsadmin button[action=ok]':{
                tap: 'onSettingsAdminOkClick'
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

    onRoomClose: function(viewport,newItem,oldItem){
        if(newItem.referenceKey == 'roomsgrid' ){
            var sessionId = oldItem.sessionId;
            this.fireEvent('closeroom',sessionId);
            this.getViewModel().set('room', null);
            newItem.deselectAll();
        }
    },

    onRoomSelect: function(view,record) {

        if (!record) return false;

        var me = this,
            navView = me.getView(),
            id = record.get('id'),
            roomName = record.get('name'),
            name = me.getViewModel().get('name'),
            room;


        room = Ext.create({
            xtype: 'chatroom',
            title: roomName,
            closable: true,
            iconCls: 'x-fa fa-comments',
            roomId: id,
            flex: 1
        });

        navView.push(room);
        navView.getViewModel().set('room', record);

        room.getViewModel().set('room', record);
        room.getViewModel().getStore('messages').getProxy().getExtraParams().room = id;

        // room.setBind({ title: '{room.name}'});

        // Notify TokBox in this case
        me.fireEvent('joinroom', room, record.data, name);



    },

    onRoomAdd: function(){
        var me = this,
            navView = me.getView(),
            form = {
                title: 'Add Room',
                iconCls: 'x-fa fa-plus-square fa-lg',
                layout: 'fit',
                items: {
                    xtype: 'chatroomform',
                    border: false

                }
            };

        navView.push(form);

    },

    onRoomEdit: function(){
        var me = this,
            navView = me.getView(),
            record = this.getViewModel().get('room'),
            form = {
                title: 'Edit Room',
                iconCls: 'x-fa fa-plus-square fa-lg',
                layout: 'fit',
                viewModel:{
                    data:{
                        theRoom: record
                    }
                },
                items: {
                    xtype: 'chatroomform',
                    border: false

                }
            };

        navView.push(form);
    },

    onRoomRemove: function(){
        var record = this.getViewModel().get('room');

        if(record){
            var store = this.getViewModel().getStore('rooms');
            this.getViewModel().getStore('rooms').remove(record);

            store.sync({
                scope: this,
                callback: this.onComplete
            });

            this.getView().pop();
        }

    },

    onSettingsUserSelect: function(){
        var me = this,
            navView = me.getView(),
            form = {
                title: 'User Settings',
                iconCls: 'x-fa fa-user fa-lg',
                layout: 'fit',
                items: {
                    xtype: 'settingsuser',
                    border: false

                }
            };
        navView.push(form);
    },

    onSettingsAdminSelect: function(){

        var me = this;

        //Theres only one setting but the REST API needs and id.
        WebRTC.model.AdminSettings.load(0,{
            success: function(record,operation){

                var navView = me.getView(),
                    form = {
                    title: 'Admin Settings',
                    iconCls: 'x-fa fa-gear fa-lg',
                    layout: 'fit',
                    items: {
                        xtype: 'settingsadmin',

                        border: false

                    }
                };

                navView.push(form);
            }
        });
    },

    onSettingsAdminOkClick: function(button){

        var me = this,
            form = button.up('panel'),
            data = form.getValues();


        if ( 1==1 ) {

            var record = form.getViewModel().data.adminSettings;

            form.updateRecord(record);

            record.save({
                scope: this,
                callback: this.onComplete
            });
            form.up('window').close();
        }


    },

    onRoomFormOkClick: function(button) {
        var form = button.up('panel'),
            data = form.getValues(),
            store = this.getViewModel().getStore('rooms');

        if ( 1 == 1  ) {

            //If there is no view model created then it is new otherwise the model has the record
            if ( form.getViewModel() )
            {
                var record = panel.getViewModel().get('theRoom');
                button.up('navigationview').pop();
                record.save({
                    scope: this,
                    callback: this.onComplete
                });

            } else {
                store.add(data);
                button.up('navigationview').pop();
                store.sync({
                    scope: this,
                    callback: this.onComplete
                });
            }
        }
    },

    onComplete: function() {

    },

    onLogoClick: function(record){
        var me = this,
            navView = me.getView(),
            form = {
                title: 'About',
                iconCls: 'x-fa fa-info-circle fa-lg',
                layout: 'fit',
                items: {
                    xtype: 'panel',
                    html: '<a href="http://www.sencha.com/services/" target="_blank" ><img src="/resources/images/About.png" border=0 ></a> ',
                    border: false

                }
            };

        navView.push(form);
    }

});
