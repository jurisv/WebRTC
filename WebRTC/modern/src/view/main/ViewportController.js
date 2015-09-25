Ext.define('WebRTC.view.main.ViewportController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.mainviewport',

    routes : {
        'home' : {
            action  : 'onRouteHome'
        },
        'room/:id' : {
            before  : 'onRouteBeforeRoom',
            action  : 'onRouteRoom'
        }
    },

    listen: {
        component: {
            'app-main': {
                back: 'onNavigationPop'
            }
        },

        controller: {
            '#' : {
                unmatchedroute : 'onRouteUnmatched'
            },
            'auth':{
                userData: 'onAuthUserData'
            }
        }
    },



    onRouteHome: function(){
        console.log('home route')
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
        var me = this;

        function checkStoreAndDisplayRoom() {
            var store = me.getViewModel().getStore('rooms'),
                record;

            if  (store) {
                if (store.isLoaded()) {
                    record = store.getById(id)
                    displayRoom(record);
                } else {
                    store.on('load', checkStoreAndDisplayRoom, me, {single: true});
                }
            } else {
                Ext.Function.defer(checkStoreAndDisplayRoom, 1200);
            }
        }

        function displayRoom(record) {
            if(record){
                me.displayRoom(record);
            }
        }

        checkStoreAndDisplayRoom();
    },

    displayRoom: function (record) {
        if (!record) return false;

        var me = this,
            navView = me.getView(),
            id = record.get('id'),
            name = me.getViewModel().get('name'),
            room;


        navView.getViewModel().set('room', record);



        room = navView.push({
            xtype: 'chatroom',
            // title: roomName,
            closable: true,
            iconCls: 'x-fa fa-comments',
            roomId: id,
            flex: 1
        });

        room.getViewModel().set('room', record);
        
        room.getViewModel().getStore('messages').getProxy().getExtraParams().room = id;

        // Notify TokBox in this case
        me.fireEvent('joinroom', room, record.data, name);
    },



    onRouteUnmatched:function(route){
        console.log('unmatched route' , route);
        this.redirectTo('home');
    },


    onAuthUserData: function(user){
        var vm = this.getViewModel();
        vm.set('user', user);
        vm.set('userid', user['id']);
        vm.set('name', user['fn']);
        
        vm.getStore('rooms').load();
    },


    onNavigationPop: function () {
        Ext.util.History.back();
        var dataview = this.getView().down('dataview');

        dataview.deselectAll(true);
    }
});
