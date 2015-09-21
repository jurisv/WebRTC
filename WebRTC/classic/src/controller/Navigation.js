Ext.define('WebRTC.controller.Navigation', {
    extend: 'Ext.app.Controller',
    id: 'Nav',
    alias: 'controller.Navigation',

    routes : {
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


    onRouteBeforeRoom : function(id, action) {
        var me = this;
        this.fireEvent('authorize');

        if(id != "undefined" && !!id){
            action.resume();
        }else{
            action.stop();
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
