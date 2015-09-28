Ext.define('WebRTC.controller.Navigation', {
    extend: 'Ext.app.Controller',
    id: 'Nav',
    alias: 'controller.Navigation',

    routes : {
        'home' : {
            action  : 'onRouteHome'
        },
        'room/:id' : {
            before  : 'onRouteBeforeRoom',
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
                var room = Ext.StoreManager.lookup('rooms').getById(roomId);
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
            if(!userCookie) {
                //if(!tempUserCookie) {
                    Ext.Msg.prompt('Nickname', 'Please enter your name', function (buttonId, value) {
                        if (value) {
                            var expires = new Date("October 13, 2095 11:13:00"),
                                newUser = Ext.create('WebRTC.model.User',{
                                    isTemp: true,
                                    name: value,
                                    status: 'temp',
                                    statusOrder: -100,
                                    fn: value
                                });

                            Ext.util.Cookies.clear('user');
                            newUser.save({
                                failure: function (record, operation) {
                                    var error = JSON.parse(operation.error.response.responseText),
                                        message = error.message.code || 'Unable to save.';

                                    action.stop();
                                },
                                success: function (record, operation) {
                                   // Ext.util.Cookies.set('user', JSON.stringify(newUser.data), expires);
                                    Ext.util.Cookies.set('user', JSON.stringify( newUser.data ), expires);
                                    action.resume();
                                },
                                callback: function (record, operation, success) {
                                }
                            });


                        }else{
                            action.stop();
                        }
                    });

            }
            else{
                var user = JSON.parse( userCookie );
                if(user['email']){
                    // since we know it was a registered user just log them in.
                    action.stop();
                    me.fireEvent('authorize');
                }else{
                    Ext.first('app-main').getViewModel().set('user',user);
                    Ext.first('app-main').getViewModel().set('name',user['fn']);
                    action.resume();
                }

            }
        }else{
            //all non public rooms need authorization
            Ext.defer(function() {
                action.stop();
                me.fireEvent('authorize');
            }, 1200);
        }
    },

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
            }else{
                me.redirectTo('')
            }
        });

    },

    onRouteToken: function(){
        var id = this.tokenInfo.id;
        this.onRouteRoom(id)
    }


});
