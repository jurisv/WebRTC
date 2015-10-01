Ext.define('WebRTC.view.chat.RoomsContainerController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.chatroomscontainer',
    mixins: ['opentok.OpenTokMixin'],

    requires: ['WebRTC.model.AdminSettings'],

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
            'auth':{
                configure: 'onAdminSetup',
                init: 'onAuthInit',
                islogin: 'onAuthIsLogin',
                islogout: 'onAuthIsLogout',
                login: 'onAuthLogin'
            },
            '*':{
                openUser: 'onUserClick'
            }
        },
        component:{
            'chatroom':{
                activate: 'onRoomActivate',
                deactivate: 'onRoomDeactivate',
                beforeclose: 'onRoomClose'
            }
        }
    },


    //If there's no config info load the dialog
    onAdminSetup: function(){
        this.onSettingsAdminSelect();
    },

    //once the authentication system is up authenticate the user
    onAuthInit: function(){
       console.log('AuthInit');
       this.fireEvent('authorize');
    },

    //user was already logged in
    onAuthIsLogin: function(){
        this.deferAndSelectFirst();
    },

    //login successful
    onAuthLogin: function(authData){
        this.deferAndSelectFirst();
    },

    //user was not logged in - so log them in
    onAuthIsLogout: function(){
       this.redirectTo('login');
       // this.fireEvent('authorize');
    },

    onGearClick: function(){
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

    selectFirstRoom: function () {
        var selection,
            combo = Ext.first('combobox[reference=roomscombo]'),
            // list = this.getView().down('chatrooms').down('dataview'),
            settings = Ext.getStore('Settings'),
            currentLaunchRoom = settings.getById('launchroom').get('value'),
            store = combo.getStore();



        if (store && store.getCount()) {
            // selection = list.getSelection();
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

    //due to latency in getting push of rooms
    deferAndSelectFirst: function(deferLength){
        var me = this;
        Ext.defer(function() {
            me.selectFirstRoom();
        }, deferLength || 1200);
    },



    onRoomAdd: function(button){
        var window = Ext.create('Ext.window.Window', {
            title: 'Add Room',
            iconCls: 'x-fa fa-plus-square fa-lg',
            height: 400,
            width: 800,
            layout: 'fit',
            resizable: true,
            modal: true,
            viewModel:{
                data:{
                    theRoom: {
                        id: null,
                        isPrivate: false
                    }
                }
            },
            items: {
                xtype: 'chatroomform',
                border: false
            }
        });
        window.show();
    },

    onRoomEdit: function(button){
        var record = Ext.first('combobox[reference=roomscombo]').getSelection();

        var window = Ext.create('Ext.window.Window', {
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
        });
        window.show();


    },

    onRoomShareClick: function(button){
        var me=this,
            room = Ext.first('combobox[reference=roomscombo]').getSelection();

        if(room && room.get('isPrivate') ){
            Ext.Ajax.request({
                url     : '/data/jwtsign/' + room.data.password,
                params:  room.data,
                success : function(response) {
                    var token = response.responseText, message,
                        message = '<a target="_new" href="' + window.location.origin + '/#token/' + token + '">' + window.location.origin + '/#token/' + token + '</a> <br/> Password to enter room: ' + room.data.password ;
                    me.showRoomShare(button,room,message,token)
                },
                failure : function() {
                }
            });
        }else{
            var message = '<a href="' + window.location + '">' + window.location + '</a>';
            me.showRoomShare(button,room,message)

        }

    },

    showRoomShare: function(button, room, message, token){
        var window = Ext.create('Ext.window.Window', {
            title: 'Share Room',
            iconCls: 'x-fa fa-share fa-lg',
            height: 400,
            width: 800,
            layout: 'fit',
            resizable: true,
            modal: true,
            viewModel:{
                data:{
                    theRoom: room,
                    theMessage: message,
                    theToken: token
                }
            },
            items: {
                xtype: 'chatroomshareform',
                border: false

            },
            listeners:{
                blur: function(){this.close();}
            }
        });
        window.show();


    },

    onRoomRemove: function(){
        var me= this,
            roomtabs = Ext.first('[reference=roomtabs]'),
            auth = WebRTC.app.getController('Auth'),
            combo = Ext.first('combobox[reference=roomscombo]'),
            record = combo.getSelection();

        if(record){
            Ext.Msg.show({
                icon: Ext.Msg.QUESTION,
                buttons: Ext.Msg.YESNO,
                title: 'Are you sure?',
                msg: 'You really want to delete room ' + record.get('name') + ' ?',
                fn: function (status) {
                    if ('yes' === status) {
                        var store = me.getViewModel().getStore('rooms');
                        me.getViewModel().getStore('rooms').remove(record);
                        Ext.Msg.wait('Removing', 'Removing room...');
                        Ext.each(roomtabs.items.items, function(childPanel) {
                            var sessionId = childPanel.getViewModel().get('room').get('sessionId');
                            me.fireEvent('closeroom',sessionId);
                            auth.firebaseRef.child('roommembers/' + childPanel.getViewModel().get('room').get('id') ).remove();
                            combo.clearValue();
                            roomtabs.remove(childPanel, true);
                        });
                        store.sync({
                            scope: me,
                            callback: me.onComplete
                        });
                        me.redirectTo('');



                    }
                }
            });
        }
    },

    onRoomSelect: function(view,record){

        if(!record) return;

        // must have name to continue.. get one.
        if( this.getViewModel().get('name') == null ){
            this.redirectTo('room/' + record.get('id'));
            return;
        }

        if(!this.getViewModel().get('user')) return;

        var me = this,
            roomtabs = Ext.first('[reference=roomtabs]'),
            defaultContent = Ext.first('[defaultContent=true]'),
            id = record.get('id'),
            tab = me.getRoomTabById(id),
            auth = WebRTC.app.getController('Auth'),
            user = me.getViewModel().get('user'),
            userId = user['id'],
            name = user['fn'],
            membersRef = auth.firebaseRef.child('roommembers/' + id + '/' + userId),
            newroom;


        if(defaultContent)
            roomtabs.remove(defaultContent, true);

        console.log('check permissions');

        //only add one
        if (!tab) {


            newroom = {
                xtype: 'chatroom',
                // closable: true,
                // iconCls: 'x-fa fa-comments',
                roomId: id,
                flex: 1
            };

            Ext.each(roomtabs.items.items, function(childPanel) {
                var sessionId = childPanel.getViewModel().get('room').get('sessionId'),
                    room = childPanel.getViewModel().get('room'),
                    roomId = childPanel.getViewModel().get('room').get('id');
                me.fireEvent('closeroom',childPanel, room, user);
                roomtabs.remove(childPanel, true);
            });

            tab = roomtabs.insert(0, newroom);

            tab.getViewModel().set('room', record);

            tab.getViewModel().getStore('messages').getProxy().setExtraParam('room',id);
            tab.getViewModel().getStore('messages').load();

            tab.getViewModel().getStore('members').getProxy().setExtraParam('room',id);
            tab.getViewModel().getStore('members').load();


            me.fireEvent('joinroom', tab, record, user);
        }

        this.redirectTo('room/' + id);

    },


    onRoomActivate: function(tab){
        var room = tab.getViewModel().get('room'),
            user = this.getViewModel().get('user'),
            combo = Ext.first('combobox[reference=roomscombo]');

        this.fireEvent('resumeroom',tab,room,user);
    },

    onRoomDeactivate: function(tab){
        var room = tab.getViewModel().get('room'),
            user = this.getViewModel().get('user');


        this.fireEvent('pauseroom',tab,room,user);
    },

    onRoomClose: function(tab){
        var room = tab.getViewModel().get('room'),
            user = this.getViewModel().get('user'),
            combo = Ext.first('combobox[reference=roomscombo]');
        combo.reset();

        this.fireEvent('closeroom',tab,room,user);
    },


    getRoomTabById: function(id){
        var roomtabs = Ext.first('[reference=roomtabs]');
        return roomtabs.child('chatroom[roomId="' + id + '"]');
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



    /*
     * This is where we can create a token for sharing the room
     */
    /*onShareRoom: function(){
        Ext.Ajax.request({
            url     : '/data/jwtsign/' + qs.pwd,

            params: payload,

            success : function(response) {
                var roomInfo = JSON.parse(response.responseText);
                action.resume();
            },
            failure : function() {
                action.stop();
            }
        });
    },*/



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

    onUserClick : function(button){
        var auth = WebRTC.app.getController('Auth'),
            user =  this.getViewModel().get('user'),
            name = this.getViewModel().get('name'),
            form;

        if(!user){
            this.redirectTo('login');
            return;
        }

        var window =  Ext.create('Ext.window.Window', {
            title: 'User',
            iconCls: 'x-fa fa-user fa-lg',
            height: 600,
            width: 600,
            modal: true,
            layout: 'fit',
            viewModel:{
                data: user
            },
            items: [{
                xtype: 'settingsuser',
                border: false

            }]
        });
        // button.up('chatroomscontainer').insert(0,window);
        window.show();
    }

});
