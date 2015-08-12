Ext.define('WebRTC.view.main.ViewportController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.mainviewport',
    mixins: ['WebRTC.OpenTokMixin'],

    requires: [
        'WebRTC.model.AdminSettings',
        'Ext.window.Toast'
    ],

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
               click: 'onRoomFormOkClick'
            },
            'chatroom':{
                activate: 'onRoomActivate',
                deactivate: 'onRoomDeactivate',
                beforeclose: 'onRoomClose'
            },
            'settingsadmin button[action=ok]':{
                click: 'onSettingsAdminOkClick'
            }
        }
    },


    init: function() {
        var me = this;
         me.checkSetup()
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

                    Ext.util.Cookies.set('user', JSON.stringify( newUser.data ) , expires);

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

            me.getViewModel().set('name', user.name );

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
            settings = Ext.getStore('Settings'),
            currentLaunchRoom = settings.getById('launchroom').get('value'),
            store = list.getStore();



        if (store && store.getCount()) {
            selection = list.getSelection();
            if (!selection || !selection.length) {
                Ext.Function.defer(function(){
                   if(currentLaunchRoom){
                       var record = store.getById(currentLaunchRoom);
                       combo.select(record);
                       //not sure why this event isn't getting fired
                       combo.fireEvent('select',combo,record);
                   }else{
                        // combo.select(store.getAt(0));
                        // list.getSelectionModel().select(0)
                        //not sure why this event isn't getting fired
                        // combo.fireEvent('select',combo,record);
                   }
                },
                500);
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
        var record = this.lookupReference('roomscombo').getSelection();

        Ext.create('Ext.window.Window', {
            title: 'Edit Room',
            iconCls: 'x-fa fa-plus-square fa-lg',
            height: 400,
            width: 800,
            layout: 'fit',
            resizable: true,
            modal: true,
            viewModel:{
                data:{
                    theRoom: record
                }
            },
            items: {
                xtype: 'chatroomform',
                border: false

            }
        }).show();


    },

    onRoomRemove: function(){
        var record = this.lookupReference('roomscombo').getSelection();

        if(record){
            var store = this.getViewModel().getStore('rooms');
            // theRecord = this.getViewModel().getStore('rooms').findBy(record);
            this.getViewModel().getStore('rooms').remove(record);
            Ext.Msg.wait('Removing', 'Removing room...');
            store.sync({
                scope: this,
                callback: this.onComplete
            });
        }

    },

    onRoomSelect: function(view,record){

        if(!record) return false;

        var me = this,
            roomtabs = this.lookupReference('roomtabs'),
            id = record.get('id'),
            tab = me.getRoomTabById(id),
            name = me.getViewModel().get('name'),
            room;


        //only add one
        if (!tab) {
            room = {
                xtype: 'chatroom',
                closable: true,
                iconCls: 'x-fa fa-comments',
                roomId: id,
                flex: 1
            };

            Ext.each(roomtabs.items.items, function(childPanel) {
                var sessionId = childPanel.getViewModel().get('room').get('sessionId');
                me.fireEvent('closeroom',sessionId);
                roomtabs.remove(childPanel, true);
            });

            tab = roomtabs.insert(0, room);

            // Notify TokBox in this case
            me.fireEvent('joinroom', tab, record.data, name);
        }

        tab.getViewModel().set('room', record);
        tab.getViewModel().getStore('messages').getProxy().getExtraParams().room = id;

        /*
        tab.getViewModel().getStore('members').getProxy().getExtraParams().room = id;

        var member = Ext.create('WebRTC.model.chat.RoomMember',{
            roomid: id,
            user_id: this.getViewModel().get('user').id,
            name: this.getViewModel().get('name')
        });

        tab.getController().roomMemberAdd(member);
        */

        roomtabs.setActiveTab(tab);

    },


    onRoomActivate: function(tab){
        var me = this,
            id = tab.getViewModel().get('room').id,
            sessionId = tab.getViewModel().get('room').get('sessionId'),
            combo = this.lookupReference('roomscombo');

        combo.select(id);

        var record = combo.getSelection(),
            name = me.getViewModel().get('name');

        this.fireEvent('resumeroom',sessionId);
    },

    onRoomDeactivate: function(tab){
        var sessionId = tab.getViewModel().get('room').get('sessionId'),
            userId = this.getViewModel().get('user').id;

        // tab.getController().roomMemberRemove(userId);

        this.fireEvent('pauseroom',sessionId);
    },

    onRoomClose: function(tab){
        var sessionId = tab.getViewModel().get('room').get('sessionId'),
            userId = this.getViewModel().get('user').id,
            combo = this.lookupReference('roomscombo');
        combo.reset();

       // tab.getController().roomMemberRemove(userId);

        this.fireEvent('closeroom',sessionId);
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
            height: 400,
            width: 600,
            layout: 'fit',
            items: {
                xtype: 'settingsuser',
                border: false

            }
        }).show();
    },

    onSettingsAdminSelect: function(){

        var me = this;

        //Theres only one setting but the REST API needs and id.
        WebRTC.model.AdminSettings.load(0,{
            success: function(record,operation){

                Ext.create('Ext.window.Window', {
                    title: 'Admin Settings',
                    iconCls: 'x-fa fa-gear fa-lg',
                    height: 500,
                    width: 400,
                    layout: 'fit',
                    modal: true,
                    items: {
                        xtype: 'settingsadmin',

                        border: false

                    }
                }).show();

            }
        });
    },

    onSettingsAdminOkClick: function(button){

        var me = this,
            window = button.up('window'),
            form = window.down('form'),
            data = form.getValues();


        if (form.isValid()) {

            Ext.Msg.wait('Saving', 'Saving initial settings...');
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
        var window = button.up('window'),
            form = window.down('form'),
            data = form.getValues(),
            store = this.getViewModel().getStore('rooms');

        if (form.isValid()) {

            //If there is no view model created then it is new otherwise the model has the record
            if ( window.getViewModel() )
            {
                var record = window.getViewModel().get('theRoom');
                Ext.Msg.wait('Saving', 'Saving room...');
                form.up('window').close();
                record.save({
                    scope: this,
                    callback: this.onComplete
                });

            } else {
                Ext.Msg.wait('Creating', 'Creating room...');
                store.add(data);
                form.up('window').close();
                store.sync({
                    scope: this,
                    callback: this.onComplete
                });
            }
        }
    },

    onComplete: function() {
        var title = Ext.Msg.getTitle();
        Ext.Msg.hide();

        Ext.toast({
            title: title,
            html:  'Finished successfully',
            align: 't',
            bodyPadding: 10
        });
    },

    onLogoClick: function(record){
        Ext.create('Ext.window.Window', {
            title: 'About',
            iconCls: 'x-fa fa-info-circle fa-lg',
            height: 640,
            width: 600,
            layout: 'fit',
            modal: true,
            items: {
                xtype: 'panel',
                html: '<a href="http://www.sencha.com/services/" target="_blank" ><img src="/static/images/About.png" border=0 ></a> ',
                border: false

            }
        }).show();
    }

});
