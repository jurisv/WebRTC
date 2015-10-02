Ext.define('WebRTC.view.chat.PresenseModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.presense',
    stores: {
        presenseusers: {
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
           /* filters: [
                function (item) {
                    if (item) {
                        if(item.get('email_pref')) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                }
            ],*/
            sorters: [
                {property: 'statusOrder', direction: 'DESC'},
                {property: 'fn', direction: 'ASC'}
            ],
            // autoSync: true,
            autoLoad: true
        }

    }
});
