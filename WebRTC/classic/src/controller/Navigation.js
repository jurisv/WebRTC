Ext.define('WebRTC.controller.Navigation', {
    extend: 'Ext.app.Controller',
    id: 'Nav',
    alias: 'controller.Navigation',

    routes : {
        'home' : {
            action  : 'onRouteHome'
        },
        'room/:id' : {
           // before  : 'onRouteBeforeRoom',
            action  : 'onRouteRoom'
        },
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
            '#' : {
                unmatchedroute : 'onRouteUnmatched'
            }
        }
    },

    onRouteHome: function(){

    },

    onRouteUnmatched:function(route){
        if(!!route){
            console.log('unmatched route' + route);
            window.location.hash = '#home';
        }
    },

   /*
   onRouteBeforeRoom : function(id, action) {
        var me = this,
            roomId = id;

        if(Ext.StoreManager.lookup('rooms').getTotalCount() > 0 ){
            var room = Ext.StoreManager.lookup('rooms').getById(roomId);
            if(!room){
                action.stop();
                me.redirectTo('');
            }else{
                me.onRouteRoomSetup(room,action);
            }

        }else{
            Ext.StoreManager.lookup('rooms').load(function(){
                var room = Ext.StoreManager.lookup('rooms').getById(roomId); //lookup the value after callback
                if(!room){
                    action.stop();
                    me.redirectTo('');
                }else{
                    me.onRouteRoomSetup(room,action);
                }
            })
        }
    },

    onRouteRoomSetup: function(room, action){
        var me= this,
            userCookie = Ext.util.Cookies.get('user');


        if( room.get('isPublic') ){
            action.resume();
        }else{
            if( room.get('isPrivate') ){
                this.redirectTo('denied');
            }else{
                action.resume();
            }
        }
    },
    */

    onRouteRoom: function(id){
        var combo = Ext.first('combobox[reference=roomscombo]');

        Ext.Function.defer(function(){
            var record = combo.store.getById(id);
            if(record){
                combo.select(record);
                combo.fireEvent('select',combo,record);
            }
        },
        1200);
    },

    onRouteBeforeToken : function(id, action) {
        var me=this,
            qs= Ext.Object.fromQueryString(location.search);

        if(qs['pwd']){
            Ext.Ajax.request({
                url     : '/data/jwtdecode/' + id +'?pwd=' + qs['pwd'],
                success : function(response) {
                    var store = Ext.StoreManager.lookup('rooms');
                    me.tokenInfo = JSON.parse(response.responseText);
                    //add the private room to the store.
                    store.add(me.tokenInfo);
                    action.resume();
                },
                failure : function(response) {
                    // var error = JSON.parse(response.responseText);
                    Ext.Msg.alert('Denied', 'The token for this room is no longer valid');
                    action.stop();
                }
            });
        }else{
            Ext.Msg.prompt('Password','Please enter password for this room',function(buttonId,value){
                if(value) {
                    Ext.Ajax.request({
                        url     : '/data/jwtdecode/' + id +'?pwd=' + value,
                        success : function(response) {
                            var store = Ext.StoreManager.lookup('rooms');
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
                }else{
                    me.redirectTo('')
                }
            });
        }



    },

    onRouteToken: function(){
        var id = this.tokenInfo.id;
        this.onRouteRoom(id)
    }


});
