Ext.define('WebRTC.model.chat.Room', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            { name: 'id', type: 'string'  },
            { name: 'name', type: 'string'  },
            { name: 'jid', type: 'string'  },
            { name: 'topic', type: 'string'  },
            { name: 'privacy', type: 'string'  },
            { name: 'owner', type: 'string'  },
            { name: 'nickname', type: 'string'  },
            { name: 'myJID', type: 'string'  , convert: function(v, record){
                return record.get('jid') + '/' + record.get('nickname');
            }},
            { name: 'xmpp_name', type: 'string'  },    // The associated XMPP client
            { name: 'num_participants', type: 'string' },
            { name: 'unread_messages',  type: 'int', defaultValue: 0     },
            { name: 'isRoom',    type: 'Boolean', defaultValue: true  },
            { name: 'joined',    type: 'Boolean', defaultValue: false }
        ],
        hasMany:[
            { model: 'WebRTC.model.chat.RoomMember', name: 'members' },
            { model: 'WebRTC.model.chat.Message', name: 'messages' }
        ]
    },
    proxy: {
        url : '/data/rooms',
        reader: {
            type: 'json', // This is the default
            rootProperty: 'data'
        }
    }
});