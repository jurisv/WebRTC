Ext.define('WebRTC.view.chat.RoomsContainerModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.chatroomscontainer',

    data: {
        room: null,
        name: null,
        user: null
    },
    stores: {
        rooms: {
            model: 'WebRTC.model.chat.Room',
            storeId: 'rooms',
            sorters: 'name',
            filters: [
                function(item) {
                    if(item){
                        var user = Ext.first('chatroomscontainer').getViewModel().get('user');
                        if(item.get('passwordVerified')) {
                            return true;
                        }else if(user && user['id']){
                            return !item.get('isPrivate') || user['id'] == item.get('owner') || user['name'] == 'admin';
                        }else{
                            return !item.get('isPrivate')
                        }
                    }
                }
            ],
            autoLoad: false  //wait for user auth prior to load
        },
        users: {
            model: 'WebRTC.model.User',
            autoLoad: true
        }
    },
    formulas: {
        isAdmin: function (get) {
            return get('name') != 'admin' ;    //shows config button if name is admin
        },
        isRoomSelectedByOwner: function (get){
            var user = Ext.first('chatroomscontainer').getViewModel().get('user');
            return get('room') != null && (user.id == get('room').get('owner') ) ;    //edit allowed only when owner
        },
        isRoomSelected: function (get) {
            return get('room') != null ;    //edit allowed only when selected
        },
        isRoomSharingEnabled: function (get) {
            return true;
        }
    }
});
