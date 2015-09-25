Ext.define('WebRTC.view.chat.PresenseModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.presense',
    data: {
        user: 'brad'
    },
    stores: {
        users: {
            model: 'WebRTC.model.User',
            proxy: {
                type: 'socketio',
                url: '/users',
                apiEvents: {
                    read: 'child_added',
                    update: 'child_changed',
                    destroy: 'child_removed'
                },
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                },
                writer: {
                    type: 'json',
                    writeAllFields: true
                }
            },
            sorters: [
                {property: 'statusOrder', direction: 'DESC'},
                {property: 'fn', direction: 'ASC'}
            ],
            autoSync: true,
            autoLoad: true
        }

    },
    formulas: {
        isAuthenticated: function (get) {
            return get('user') != null
        }
    }
});
