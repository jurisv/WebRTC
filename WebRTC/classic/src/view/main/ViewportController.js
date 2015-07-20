Ext.define('WebRTC.view.main.ViewportController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.mainviewport',
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
            },
            'socketio':{
                roomschanged: 'onRoomsChanged'
            }
        },
        component:{
            'chatroomform button[action=ok]':{
               click: 'onRoomFormOkClick'
            },
            'chatrooms dataview':{
             //   afterrender: 'selectFirstRoom'
            }
        },
        global: {
            '*':{
                roomschanged: 'onRoomsChanged'
            }
        }
    },


    init: function() {
         var me = this,
             userCookie = Ext.util.Cookies.get('user'),
             user,
             store = Ext.create('Ext.data.Store',{
                 model: 'WebRTC.model.User',
                 autoLoad: true
             });

        // Use this area to run function to launch screen instantly
        // this.onSettingsUserSelect();
        // return;


         if(!userCookie){
             Ext.Msg.prompt('Username','Please enter your name',function(buttonId,value){
                 if(value) {
                     //set the persons name
                     var expires = new Date("October 13, 2095 11:13:00"),
                         newUser = Ext.create('WebRTC.model.User',{
                             name: value
                         });

                     Ext.util.Cookies.clear('user');

                     newUser.save();

                     me.getViewModel().set('name', newUser.get('name') );

                     me.getViewModel().set('user', newUser);

                     Ext.util.Cookies.set('user', JSON.stringify(newUser) , expires);

                   /*  Ext.toast({
                         html: newUser + ' give us a moment while we set things up.',
                         title: 'Welcome',
                         width: 400,
                         align: 't'
                     });
                    */

                    Ext.defer(function() {
                         me.selectFirstRoom();
                    }, 1200);

                 }
             });
         }else{
             user =  JSON.parse(userCookie) ;
             me.getViewModel().set('user', user);

             me.getViewModel().set('name', user.data.name );

            /* Ext.toast({
                 html: 'Glad to see you again ' + user.data.name  + '.',
                 title: 'Welcome Back',
                 width: 400,
                 align: 't'
             });*/

             Ext.defer(function() {
                 me.selectFirstRoom();
             }, 1200);

         }
    },

    selectFirstRoom: function () {
        var selection,
            combo = this.lookupReference('roomscombo'),
            list = this.getView().down('chatrooms').down('dataview'),
            store = list.getStore();


        if (store && store.getCount()) {
            selection = list.getSelection();
            if (!selection || !selection.length) {
                Ext.Function.defer(function(){
                   combo.select(store.getAt(0));
                   list.getSelectionModel().select(0)
                },
                100);
            }
        }
    },

    onRoomAdd: function(){
        Ext.create('Ext.window.Window', {
            title: 'Add Room',
            iconCls: 'x-fa fa-plus-square fa-lg',
            height: 250,
            width: 800,
            layout: 'fit',
            items: {
                xtype: 'chatroomform',
                border: false

            }
        }).show();
    },

    onRoomEdit: function(){
        Ext.create('Ext.window.Window', {
            title: 'Edit Room',
            iconCls: 'x-fa fa-plus-square fa-lg',
            height: 250,
            width: 800,
            layout: 'fit',
            items: {
                xtype: 'chatroomform',
                border: false

            }
        }).show();
    },

    onRoomSelect: function(view,record){
        var me = this,
            roomtabs = this.lookupReference('roomtabs'),
            id = record.get('id'),
            tab = me.getRoomTabById(id),
            name = me.getViewModel().get('name'),
            room;

        if(!record) return false;

        //set main active room
        me.getViewModel().set('room',record.data);

        //only add one
        if (!tab) {
            room = {
                xtype: 'chatroom',
                closable: true,
                iconCls: 'x-fa fa-comments',
                roomId: id,
                viewModel:{
                    data: {
                        room: record.data
                    }
                },
                flex: 1
            };

            Ext.suspendLayouts();
            tab = roomtabs.insert(0, room);
            Ext.resumeLayouts(true);

            // Notify TokBox in this case
            me.fireEvent('joinroom', tab, record.data, name);
        }
        roomtabs.setActiveTab(tab);



    },

    onRoomsChanged: function(rooms){
        this.lookupReference('homerooms').down('dataview').getStore().loadData(rooms);
    },

    onDeactivate: function(){
        alert('deactivate');
    },

    onActivate: function(){
        alert('deactivate');
    },

    getRoomTabById: function(id){
        var roomtabs = this.lookupReference('roomtabs');
        return roomtabs.child('chatroom[roomId="' + id + '"]');
    },

    onToggleFullScreen: function (button) {
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


    onSettingsUserSelect: function(){
        Ext.create('Ext.window.Window', {
            title: 'User Settings',
            iconCls: 'x-fa fa-user fa-lg',
            height: 200,
            width: 400,
            layout: 'fit',
            items: {
                xtype: 'settingsuser',
                border: false

            }
        }).show();
    },

    onSettingsAdminSelect: function(){
        Ext.create('Ext.window.Window', {
            title: 'Admin Settings',
            iconCls: 'x-fa fa-gear fa-lg',
            height: 400,
            width: 400,
            layout: 'fit',
            items: {
                xtype: 'settingsadmin',
                border: false

            }
        }).show();
    },


    onRoomFormOkClick: function(button) {
        var form = button.up('form'),
            data = form.getValues(),
            store = this.getViewModel().getStore('rooms');
        store.add(data);
        store.sync();

        // this.fireEvent('addroom', form.getValues() );
    }

});
