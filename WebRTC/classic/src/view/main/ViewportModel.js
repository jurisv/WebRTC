Ext.define('WebRTC.view.main.ViewportModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.mainviewport',

    data: {
        name: null,                     // set cookie on init
        user: null,                     // set cookie on init
        room: null,
        authToken: 'myAuthTokenHere'
    },
    stores: {
        rooms: {
            model: 'WebRTC.model.chat.Room',
            storeId: 'rooms',
            sorters: 'name',
            proxy: {
                type: 'socketio',
                url : '/rooms',
                extraParams: '{getAuthToken}',
                apiEvents: {
                    read: 'child_added',
                    update: 'child_changed',
                    destroy: 'child_removed'
                },
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            },
            filters: [
                function(item) {
                    return !item.get('isPrivate');
                }
            ],
            autoLoad: true
        },
        globalusers: {
            model: 'WebRTC.model.chat.RoomMember',
            autoLoad: true
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
        isRoomSelected: function (get) {
            return get('room') != null ;    //edit allowed only when selected
        },
        getAuthToken: function (get) {
            if( get('authToken') ){
                return {
                    authToken: get('authToken')
                };
            }else{
                // AuthToken not set could route to login code??
                return {
                    authToken: null
                };
            }
        }
    }
});
