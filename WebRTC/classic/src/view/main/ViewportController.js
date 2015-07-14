Ext.define('WebRTC.view.main.ViewportController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.mainviewport',
    mixins: ['WebRTC.OpenTokMixin'],

    listen: {
        controller: {
            '*': {
              playsound: 'onPlaysound'
            },
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
            'chatrooms':{
//             activate: 'onActivate',
//             deactivate: 'onDeactivate'
            },
            'chatrooms dataview':{
             //   afterrender: 'selectFirstRoom'
            }
        }
    },

    //this doesn't seem to init the listeners although it should?
   /* constructor: function (config) {
        this.mixins.opentok.constructor.call(this, config);
    },
    */

    init: function() {
         var me = this,
             user = Ext.util.Cookies.get('user');

         if(!user || 1==1){
             Ext.Msg.prompt('Username','Please enter your name',function(buttonId,value){
                 if(value) {
                     //set the persons name
                     var expires = new Date("October 13, 2095 11:13:00"),
                         newUser = value;
                     Ext.util.Cookies.clear('user');

                     me.getViewModel().set('name', value);

                     Ext.util.Cookies.set('user',newUser, expires);

                   /*  Ext.toast({
                         html: newUser + ' give us a moment while we set things up.',
                         title: 'Welcome',
                         width: 400,
                         align: 't'
                     });
                    */

                    me.selectFirstRoom();

                 }
             });
         }else{
             Ext.toast({
                 html: 'Glad to see you again ' + user + '.',
                 title: 'Welcome Back',
                 width: 400,
                 align: 't'
             });
             me.selectFirstRoom();

         }
    },

    selectFirstRoom: function () {
        var selection,
            list = this.getView().down('chatrooms').down('dataview'),
            store = list.getStore();


        if (store && store.getCount()) {
            selection = list.getSelection();
            if (!selection || !selection.length) {
                Ext.Function.defer(function(){
                    list.getSelectionModel().select(0)
                },
                100);
            }
        }
    },

    onRoomSelect: function(view,record){
        var me = this,
            roomtabs = this.lookupReference('roomtabs'),
            id = record.get('id'),
            tab = me.getRoomTabById(id),
            room;

        if(!record) return false;

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
        }
        roomtabs.setActiveTab(tab);

        // Notify TokBox in this case
        me.fireEvent('roomselect',tab, record.data);

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


})
