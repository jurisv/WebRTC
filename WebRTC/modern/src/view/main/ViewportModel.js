Ext.define('WebRTC.view.main.ViewportModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.mainviewport',

    data: {
        name: null,                     // set cookie on init
        user: null,                     // set cookie on init
        room: null                      // ?? perhaps delete
    },
    stores: {
        rooms: {
            model: 'WebRTC.model.chat.Room',
            storeId: 'rooms',
            sorters: 'name',
            grouper: {
                groupFn: function(record) {
                    return record.get('name')[0];
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
        }
    }
});
