Ext.define('WebRTC.view.chat.RoomsContainerModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.chatroomscontainer',

    data: {
        room: null
    },
    stores: {
        presense: {
            model: 'WebRTC.model.User',
            source: '{users}',
            autoLoad: true
        },
        myrooms: {
            source: 'rooms',
            sorters: [{property: 'date', direction: 'ASC'}],
            filters: [
                function (item) {
                    if (item) {
                        var user = Ext.first('chatroomscontainer').getViewModel().get('user');
                        if (item.get('isPublic')) {
                            return true;
                        } else if (user && user['name'] == 'admin' ) {
                            return true;
                        } else if (user && user['id'] == item.get('owner') ) {
                            return true;
                        }  else if (user && user['id'] && !user['isTemp']) {
                            return !item.get('isPrivate')
                        }else {
                            return false;
                        }
                    }
                }
            ],
            autoLoad: true,
            autosync: true
        }
    },
    formulas: {
        isUser: function (get) {
            return !!get('user');
        },
        isAdmin: function (get) {
            return get('name') != 'admin';    //shows config button if name is admin
        },
        isRoomSelectedByOwner: function (get) {
            var user = Ext.first('chatroomscontainer').getViewModel().get('user');
            if (user) {
                return get('room') != null && (user.id == get('room').get('owner') );    //edit allowed only when owner
            } else {
                return false
            }
        },
        isRoomSelected: function (get) {
            return !!get('user') && get('room') != null;    //edit allowed only when selected by a user
        },
        isRoomSharingEnabled: function (get) {
            return true;
        }
    }
});
