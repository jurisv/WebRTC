Ext.define('WebRTC.view.chat.RoomsContainerController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.chatroomscontainer',
    mixins: ['opentok.OpenTokMixin'],

    requires: ['WebRTC.model.AdminSettings'],

    routes : {
        'token/:id' : {
            before  : 'onRouteBeforeToken',
            action  : 'onRouteToken',
            conditions : {
                ':id' : '(.*)'
            }
        },
        'user' : {
            action  : 'onRouteUser'
        },
        'settings' : {
            before  : 'onRouteBeforeSettings',
            action  : 'onRouteSettings'
        }
    },

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
                login: 'onAuthLogin',
                userData: 'onAuthUserData'
            }
        }
        // component:{
        //     'chatroom':{
        //         activate: 'onRoomActivate',
        //         destroy: 'onRoomRemoved'
        //         // deactivate: 'onRoomDeactivate',
        //         // beforeclose: 'onRoomClose'
        //     }
        // }
    },

    // required by OpenTokMixin
    getRoomBySessionId: function(sessionId){
        var room = Ext.first('chatroom[sessionId="' + sessionId + '"]');

        return room;
    },

    getOpenTokController: function () {
        return WebRTC.app.getController('OpenTok');
    },


    //If there's no config info load the dialog
    onAdminSetup: function(){
        this.onSettingsAdminSelect();
    },

    //once the authentication system is up authenticate the user
    onAuthInit: function(){
        this.fireEvent('authorize');
    },

    //something in the user data changed
    onAuthUserData: function(user){
        // this.getViewModel().set('user', user);
        // this.getViewModel().set('userid', user['id']);
        // this.getViewModel().set('name', user['fn']);

        // Ext.StoreManager.lookup('rooms').load();
    },

    //user was already logged in
    onAuthIsLogin: function(){
        this.deferAndSelectFirst();
    },

    //user was not logged in
    onAuthIsLogout: function(){
        this.fireEvent('authorize');
    },

    //login successful
    onAuthLogin: function(){
        this.deferAndSelectFirst();
    },


    // @TODO
    selectFirstRoom: function () {
        console.log('TODO: selectFirstRoom')
        // var selection,
        //     combo = Ext.first('combobox[reference=roomscombo]'),
        //     // list = this.getView().down('chatrooms').down('dataview'),
        //     settings = Ext.getStore('Settings'),
        //     currentLaunchRoom = settings.getById('launchroom').get('value'),
        //     store = combo.getStore();



        // if (store && store.getCount()) {
        //     // selection = list.getSelection();
        //     if (!selection || !selection.length) {
        //         Ext.Function.defer(function(){
        //             if(currentLaunchRoom){
        //                 var record = store.getById(currentLaunchRoom);
        //                 combo.select(record);
        //                 //not sure why this event isn't getting fired
        //                 combo.fireEvent('select',combo,record);
        //             }else{
        //                 // combo.select(store.getAt(0));
        //                 // list.getSelectionModel().select(0)
        //                 //not sure why this event isn't getting fired
        //                 // combo.fireEvent('select',combo,record);
        //             }
        //         },
        //         500);
        //     }
        // }
    },

    //due to latency in getting push of rooms
    deferAndSelectFirst: function(deferLength){
        var me = this;
        Ext.defer(function() {
            me.selectFirstRoom();
        }, deferLength || 1200);
    },



    onRoomAdd: function(button){
        console.log('TODO: onRoomAdd');
        // var window = Ext.create('Ext.window.Window', {
        //     title: 'Add Room',
        //     iconCls: 'x-fa fa-plus-square fa-lg',
        //     height: 400,
        //     width: 800,
        //     layout: 'fit',
        //     resizable: true,
        //     modal: true,
        //     autoShow: true,
        //     viewModel:{
        //         data:{
        //             theRoom: {
        //                 id: null,
        //                 isPrivate: false
        //             }
        //         }
        //     },
        //     items: {
        //         xtype: 'chatroomform',
        //         border: false
        //     }
        // });
        // button.up('chatroomscontainer').add(window);
    },

    onRoomEdit: function(button){
        console.log('TODO: onRoomEdit');
        // var record = Ext.first('combobox[reference=roomscombo]').getSelection();

        // var window = Ext.create('Ext.window.Window', {
        //     title: 'Edit Room',
        //     iconCls: 'x-fa fa-plus-square fa-lg',
        //     height: 400,
        //     width: 800,
        //     layout: 'fit',
        //     resizable: true,
        //     modal: true,
        //     autoShow: true,
        //     viewModel:{
        //         data:{
        //             theRoom: record
        //         }
        //     },
        //     items: {
        //         xtype: 'chatroomform',
        //         border: false

        //     }
        // });
        // button.up('chatroomscontainer').add(window);


    },

    onRoomShare: function(){
        var room = Ext.first('combobox[reference=roomscombo]').getSelection();

        if(room && room.get('isPrivate') ){
            Ext.Ajax.request({
                url     : '/data/jwtsign/' + room.data.password,

                params:  room.data,

                success : function(response) {
                    var token = response.responseText, message,
                        message = '<a target="_new" href="' + window.location.origin + '/#token/' + token + '">' + window.location.origin + '/#token/' + token + '</a> <br/> Password to enter room: ' + room.data.password ;
                    Ext.Msg.alert('Private Room Token', message);

                },
                failure : function() {
                }
            });
        }else{
            var message = '<a href="' + window.location + '">' + window.location + '</a>';
            Ext.Msg.alert('Public Room Link', message);

            alert();
        }

    },

    onRoomRemove: function(){
        var record = Ext.first('combobox[reference=roomscombo]').getSelection();

        if(record){
            var store = this.getViewModel().getStore('rooms');
            this.getViewModel().getStore('rooms').remove(record);
            Ext.Msg.wait('Removing', 'Removing room...');
            store.sync({
                scope: this,
                callback: this.onComplete
            });
        }
    },

    onRoomSelect: function(view, index, target, record) {
        if (!record) {
            this.redirectTo('home');
            return false;
        }

        var me = this,
            id = record.get('id');

    
        me.redirectTo('room/' + id);

    },

    onRoomActivate: function(tab){
        var me = this,
            sessionId = tab.getViewModel().get('room').get('sessionId');

        this.fireEvent('resumeroom',sessionId);
    },

    onRoomRemoved: function(tab){
        var sessionId = tab.getViewModel().get('room').get('sessionId');

        this.fireEvent('pauseroom',sessionId);
    },

    onRoomClose: function(tab){
        console.log('onRoomClose')

        var room = tab.getViewModel().get('room'),
            sessionId = room.get('sessionId'),
            roomId =  room.get('id'),
            userId = this.getViewModel().get('user').id;

        tab.getController().roomMemberRemove(userId);

        this.fireEvent('closeroom',sessionId);
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
    onShareRoom: function(){
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
    },


    onRouteBeforeToken : function(id, action) {
        var me=this;

        Ext.Msg.prompt('Password','Please enter password for this room',function(buttonId,value){
            if(value) {
                Ext.Ajax.request({
                    url     : '/data/jwtdecode/' + id +'?pwd=' + value,
                    success : function(response) {
                        var store = me.getViewModel().getStore('rooms');

                        me.tokenInfo = JSON.parse(response.responseText);
                        //add the private room to the store.
                        store.add(me.tokenInfo);
                        action.resume();
                    },
                    failure : function(response) {
                        // var error = JSON.parse(response.responseText);
                        Ext.Msg.alert('Denied', 'The password entered is no longer valid');
                        action.stop();
                    }
                });
            }
        });

    },

    onRouteToken: function(){
        var id = this.tokenInfo.id;
        this.onRouteRoom(id)
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

    onDisplayUserSettings : function(button){
        var me = this,
            navView = me.getView().up('app-main'),
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

    }

});
