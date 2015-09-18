Ext.define('WebRTC.view.main.ViewportController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.mainviewport',

    // requires: [
    //     'Ext.window.Toast'
    // ],

    routes : {
        'home' : {
            action  : 'onRouteHome'
        }
    },
    listen: {
        controller: {
            '#' : {
                unmatchedroute : 'onRouteUnmatched'
            }
        }
    },
    onRouteHome: function(){
        // var me = this,
        //     storage = Ext.util.LocalStorage.get('userStorage'),
        //     user, data;

        // data = storage.getItem('user');

        // if (data) {
        //     user =  JSON.parse(data);
        //     me.getViewModel().set('user', user);
        //     me.getViewModel().set('name', user.name );
        // }

    },

    onRouteUnmatched:function(route){
        if(!!route){
            console.log('unmatched route' + route);
            window.location.hash = '#home';
        }
    }
});


// Ext.define('WebRTC.view.main.ViewportController', {
//     extend: 'Ext.app.ViewController',
//     alias: 'controller.mainviewport',
//     mixins: ['opentok.OpenTokMixin'],

//     requires: [
//         'opentok.controller.OpenTok',
//         'soundlibrary.controller.SoundLibrary',
//         // 'auth.controller.Auth',
//         'WebRTC.model.AdminSettings',
//         'Ext.Toast'
//     ],

//     routes : {
//         'home' : {
//             action  : 'onRouteHome'
//         },
//         'room/:id' : {
//             before  : 'onRouteBeforeRoom',
//             action  : 'onRouteRoom'
//         },
//         'token/:id' : {
//             before  : 'onRouteBeforeToken',
//             action  : 'onRouteToken',
//             conditions : {
//                 ':id' : '(.*)'
//             }
//         },
//         'user' : {
//             action  : 'onRouteUser'
//         },
//         'settings' : {
//             before  : 'onRouteBeforeSettings',
//             action  : 'onRouteSettings'
//         }
//     },

//     listen: {
//         controller: {
//             'opentok': {
//                 chatreceived : 'onOTChatReceived',
//                 connectioncreated : 'onOTConnectionCreated',
//                 connectiondestroyed : 'onOTConnectionDestroyed',
//                 streamcreated : 'onOTStreamCreated',
//                 streamdestroyed : 'onOTStreamDestroyed',
//                 sessionconnected : 'onOTSessionConnected',
//                 sessiondisconnect : 'onOTSessionDestroyed'
//             },
//             '#' : {
//                 unmatchedroute : 'onRouteUnmatched'
//             }
//         },
//         component:{
//             'chatroomform button[action=ok]':{
//                click: 'onRoomFormOkClick'
//             },
//             'chatroom':{
//                 activate: 'onRoomActivate',
//                 deactivate: 'onRoomDeactivate',
//                 beforeclose: 'onRoomClose'
//             },
//             'settingsadmin button[action=ok]':{
//                 click: 'onSettingsAdminOkClick'
//             }
//         }
//     },


//     init: function() {
//         var me = this;
//         me.checkSetup()
//     },

//     onShow: function(){
//         Ext.Viewport.setMenu(this.createMenu(),{
//             side: 'left',
//             reveal: true
//         });
//     },


//     checkSetup: function(){
//         var me= this;

//        me.getViewModel().data.settings = WebRTC.model.AdminSettings.load(0,{
//             success: function(record,operation){
//                 if( !record.get('otApiKey') ){
//                     me.onSettingsAdminSelect();
//                 }else{
//                     //get the firebase url and create a client instance of Firebase at the viewport.
//                     var url = record.data.fbUrl;
//                     Ext.first('app-main').getViewModel().data.firebaseRef =  new Firebase(url);

//                     me.authenticate(
//                         function() {
//                             me.deferAndSelectFirst();
//                         },
//                         function(){
//                             me.handleUnauthorized();
//                         })
//                 }
//             }
//         });

//     },

//     handleUnauthorized: function(){
//         var me = this;
//         me.authenticate(
//         function() {
//             me.deferAndSelectFirst();
//         },
//         function(){
//             me.handleUnauthorized();
//         })
//     },


//     authenticate: function(success,failure){
//       var me = this,
//             userStore = Ext.util.LocalStorage.get('userStorage'),
//             user;

//         user = userStore.getItem('user');

//         if(!user){
//            me.fireEvent('authorize',{
//                success: success,
//                failure: failure
//            });
//         }else{
//             user =  JSON.parse(user) ;
//             me.getViewModel().set('user', user);
//             me.getViewModel().set('name', user.name );
//             if(success && Ext.isFunction(success)){
//                 success();
//             }

//         }
//     },

//     //due to latency in getting push of rooms
//     deferAndSelectFirst: function(deferLength){
//         // var me = this;
//         // Ext.defer(function() {
//         //     me.selectFirstRoom();
//         // }, deferLength || 1200);
//         console.log('select First Room here');
//     },


//     getOTGlobalSession: function(){
//         var me=this;
//         //get the global TokBox session
//          Ext.Ajax.request({
//             url: '/data/global/',
//             params: {
//                 role: 'publisher',
//                 name: me.getViewModel().get('name')
//             },
//             success: function(response){
//                var sessionInfo = JSON.parse(response.responseText);
//                me.getView().down('chatroom').getViewModel().set('otSessionInfo', sessionInfo );
//             }
//         });
//         Ext.Ajax.request({
//             url: '/data/token/1_MX40NTI1NDI2Mn5-MTQzMzk1NTY3NDMyMn5Xd0FpdUFYSEdFaVUwaVY4M3ZTS3RyT2p-UH4',
//             params: {
//                 role: 'publisher',
//                 name: me.getViewModel().get('name')
//             },
//             success: function(response){
//                //set session info on video room
//                var sessionInfo = JSON.parse(response.responseText);
//                me.getView().down('videoroom').getViewModel().set('otSessionInfo', sessionInfo );
//             }
//         });
//     },

//     onToggleFullScreen: function () {
//         if (!document.fullscreenElement &&    // alternative standard method
//             !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement ) {  // current working methods
//             if (document.documentElement.requestFullscreen) {
//                 document.documentElement.requestFullscreen();
//             } else if (document.documentElement.msRequestFullscreen) {
//                 document.documentElement.msRequestFullscreen();
//             } else if (document.documentElement.mozRequestFullScreen) {
//                 document.documentElement.mozRequestFullScreen();
//             } else if (document.documentElement.webkitRequestFullscreen) {
//                 document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
//             }
//         } else {
//             if (document.exitFullscreen) {
//                 document.exitFullscreen();
//             } else if (document.msExitFullscreen) {
//                 document.msExitFullscreen();
//             } else if (document.mozCancelFullScreen) {
//                 document.mozCancelFullScreen();
//             } else if (document.webkitExitFullscreen) {
//                 document.webkitExitFullscreen();
//             }
//         }
//     },

//     onHamburgerClick: function(){
//             if(Ext.Viewport.getMenus().left.isHidden()){
//                 Ext.Viewport.showMenu('left');
//             }
//             else
//             {
//                 Ext.Viewport.hideMenu('left');
//             }

//     },

//     createMenu: function(){
//         var menu = Ext.create('Ext.Menu', {
//             width: 250,
//             scrollable: 'vertical',
//             items: [
//                 {
//                     xtype: 'button',
//                     text: 'Join Room',
//                     handler: function(){
//                         console.log("Join Room Tapped");
//                     }
//                 },{
//                     xtype: 'button',
//                     text: 'Toggle Camera',
//                     handler: function(){
//                         console.log("Toggle Camera Tapped");
//                     }
//                 },
//                 {
//                     xtype: 'button',
//                     text: 'Toggle Microphone',
//                     handler: function(){
//                         console.log("Toggle Microphone Tapped");
//                     }
//                 }
//             ]
//         });
//         return menu;
//     },

//     onRoomActivate: function(tab){
//         var me = this,
//             id = tab.getViewModel().get('room').id,
//             sessionId = tab.getViewModel().get('room').get('sessionId');
//             // combo = this.lookupReference('roomscombo');

//         // combo.select(id);

//         // var record = combo.getSelection(),
//         //     name = me.getViewModel().get('name');

//         this.fireEvent('resumeroom',sessionId);
//     },

//     onRoomDeactivate: function(tab){
//         var sessionId = tab.getViewModel().get('room').get('sessionId'),
//             userId = this.getViewModel().get('user').id;

//         // tab.getController().roomMemberRemove(userId);

//         this.fireEvent('pauseroom',sessionId);
//     },



//     onRoomFormOkClick: function(button) {
//         var window = button.up('window'),
//             form = window.down('form'),
//             data = form.getValues(),
//             store = this.getViewModel().getStore('rooms');

//         if (form.isValid()) {

//             //If there is no view model created then it is new otherwise the model has the record
//             if ( window.getViewModel().get('id') != null )
//             {
//                 var record = window.getViewModel().get('theRoom');
//                 Ext.Msg.wait('Saving', 'Saving room...');
//                 form.up('window').close();
//                 record.save({
//                     scope: this,
//                     callback: this.onComplete
//                 });

//             } else {
//                 Ext.Msg.wait('Creating', 'Creating room...');
//                 store.add(data);
//                 form.up('window').close();
//                 store.sync({
//                     scope: this,
//                     callback: this.onComplete
//                 });
//             }
//         }
//     },    

//     onRoomClose: function(viewport,newItem,oldItem){
//         if(newItem.referenceKey == 'roomsgrid' ){
//             var sessionId = oldItem.sessionId;
//             this.fireEvent('closeroom',sessionId);
//             this.getViewModel().set('room', null);
//             newItem.deselectAll();
//         }
//     },

//     // onRoomClose: function(tab){
//     //     var sessionId = tab.getViewModel().get('room').get('sessionId'),
//     //         userId = this.getViewModel().get('user').id,
//     //         combo = this.lookupReference('roomscombo');
//     //     combo.reset();

//     //    // tab.getController().roomMemberRemove(userId);

//     //     this.fireEvent('closeroom',sessionId);
//     // },    

//     onRoomSelect: function(view,record) {

//         if (!record) return false;

//         var me = this,
//             navView = me.getView(),
//             id = record.get('id'),
//             roomName = record.get('name'),
//             name = me.getViewModel().get('name'),
//             room;


//         room = Ext.create({
//             xtype: 'chatroom',
//             title: roomName,
//             closable: true,
//             iconCls: 'x-fa fa-comments',
//             roomId: id,
//             flex: 1
//         });

//         navView.push(room);
//         navView.getViewModel().set('room', record);

//         room.getViewModel().set('room', record);
//         room.getViewModel().getStore('messages').getProxy().getExtraParams().room = id;

//         // room.setBind({ title: '{room.name}'});

//         // Notify TokBox in this case
//         me.fireEvent('joinroom', room, record.data, name);



//     },

//     onRoomAdd: function(){
//         var me = this,
//             navView = me.getView(),
//             form = {
//                 title: 'Add Room',
//                 iconCls: 'x-fa fa-plus-square fa-lg',
//                 layout: 'fit',
//                 items: {
//                     xtype: 'chatroomform',
//                     border: false

//                 }
//             };

//         navView.push(form);

//     },

//     onRoomEdit: function(){
//         var me = this,
//             navView = me.getView(),
//             record = this.getViewModel().get('room'),
//             form = {
//                 title: 'Edit Room',
//                 iconCls: 'x-fa fa-plus-square fa-lg',
//                 layout: 'fit',
//                 viewModel:{
//                     data:{
//                         theRoom: record
//                     }
//                 },
//                 items: {
//                     xtype: 'chatroomform',
//                     border: false

//                 }
//             };

//         navView.push(form);
//     },

//     onRoomRemove: function(){
//         var record = this.getViewModel().get('room');

//         if(record){
//             var store = this.getViewModel().getStore('rooms');
//             this.getViewModel().getStore('rooms').remove(record);

//             store.sync({
//                 scope: this,
//                 callback: this.onComplete
//             });

//             this.getView().pop();
//         }

//     },

//     onSettingsUserSelect: function(){
//         var me = this,
//             navView = me.getView(),
//             form = {
//                 title: 'User Settings',
//                 iconCls: 'x-fa fa-user fa-lg',
//                 layout: 'fit',
//                 items: {
//                     xtype: 'settingsuser',
//                     border: false

//                 }
//             };
//         navView.push(form);
//     },

//     onSettingsAdminSelect: function(){

//         var me = this;

//         //Theres only one setting but the REST API needs and id.
//         WebRTC.model.AdminSettings.load(0,{
//             success: function(record,operation){

//                 var navView = me.getView(),
//                     form = {
//                     title: 'Admin Settings',
//                     iconCls: 'x-fa fa-gear fa-lg',
//                     layout: 'fit',
//                     items: {
//                         xtype: 'settingsadmin',

//                         border: false

//                     }
//                 };

//                 navView.push(form);
//             }
//         });
//     },

//     onSettingsAdminOkClick: function(button){

//         var me = this,
//             form = button.up('panel'),
//             data = form.getValues();


//         if ( 1==1 ) {

//             var record = form.getViewModel().data.adminSettings;

//             form.updateRecord(record);

//             record.save({
//                 scope: this,
//                 callback: this.onComplete
//             });
//             form.up('window').close();
//         }


//     },

//     onRoomFormOkClick: function(button) {
//         var form = button.up('panel'),
//             data = form.getValues(),
//             store = this.getViewModel().getStore('rooms');

//         if ( 1 == 1  ) {

//             //If there is no view model created then it is new otherwise the model has the record
//             if ( form.getViewModel() )
//             {
//                 var record = panel.getViewModel().get('theRoom');
//                 button.up('navigationview').pop();
//                 record.save({
//                     scope: this,
//                     callback: this.onComplete
//                 });

//             } else {
//                 store.add(data);
//                 button.up('navigationview').pop();
//                 store.sync({
//                     scope: this,
//                     callback: this.onComplete
//                 });
//             }
//         }
//     },

//     onComplete: function() {

//     },

//     onLogoClick: function(record){
//         var me = this,
//             navView = me.getView(),
//             form = {
//                 title: 'About',
//                 iconCls: 'x-fa fa-info-circle fa-lg',
//                 layout: 'fit',
//                 items: {
//                     xtype: 'panel',
//                     html: '<a href="http://www.sencha.com/services/" target="_blank" ><img src="/resources/images/About.png" border=0 ></a> ',
//                     border: false

//                 }
//             };

//         navView.push(form);
//     },

//     onRouteBeforeRoom : function(id, action) {
//         var me = this;

//         me.authenticate(function(){
//             action.resume()
//         },function(){
//             action.stop();
//             me.handleUnauthorized();
//         });

//     },

//     onRouteRoom: function(id){
//         var me = this;
//             // combo = me.lookupReference('roomscombo');

//         //since the server pushes us rooms the using callback on load doesn't work
//         //a defer seems to work fine for now
//         // Ext.Function.defer(function(){
//         //     var record = combo.store.getById(id);

//         //     if(record){
//         //         combo.select(record);
//         //         //not sure why this event isn't getting fired
//         //         combo.fireEvent('select',combo,record);
//         //     }else{
//         //         Ext.toast({
//         //             html: 'We could not find the room provided.',
//         //             title: 'Room not found',
//         //             width: 400,
//         //             align: 't'
//         //         });
//         //     }
//         // },
//         // 1200);

//         me.redirectTo('room/' + id);

//     },

//     /*
//     * This is where we can create a token for sharing the room
//     */
//     onShareRoom: function(){
//         Ext.Ajax.request({
//             url     : '/data/jwtsign/' + qs.pwd,

//             params: payload,

//             success : function(response) {
//                 var roomInfo = JSON.parse(response.responseText);
//                 action.resume();
//             },
//             failure : function() {
//                 action.stop();
//             }
//         });
//     },


//     onRouteBeforeToken : function(id, action) {
//         var me=this;

//         Ext.Msg.prompt('Password','Please enter password for this room',function(buttonId,value){
//             if(value) {
//                 Ext.Ajax.request({
//                     url     : '/data/jwtdecode/' + id +'?pwd=' + value,
//                     success : function(response) {
//                         var store = me.getViewModel().getStore('rooms');

//                         me.tokenInfo = JSON.parse(response.responseText);
//                         //add the private room to the store.
//                         store.add(me.tokenInfo);
//                         action.resume();
//                     },
//                     failure : function(response) {
//                         // var error = JSON.parse(response.responseText);
//                         Ext.Msg.alert('Denied', 'The password entered is no longer valid');
//                         action.stop();
//                     }
//                 });
//             }
//         });

//     },

//     onRouteToken: function(){
//        var id = this.tokenInfo.id;
//        this.onRouteRoom(id)
//     },

//     onRouteHome: function(){
//             var me = this;
//            // me.checkSetup()
//     },

//     onRouteUnmatched:function(route){
//         var me = this;
//         console.log('unmatched route' + route);
//         window.location.hash = '#home';
//     }    

// });
