Ext.define('WebRTC.model.chat.Room', {
    extend: 'Ext.data.Model',
    requires: ['WebRTC.data.proxy.SocketIO'],
    idProperty: 'id',
    identifier: 'uuid', //creates a uuid and assisgns it to the id field

    fields: [
        { name: 'id', type: 'string'  },
        { name: 'sessionId', type: 'string'  },  //Tokbox SessionId
        { name: 'apiKey', type: 'number'  },  //Tokbox apiKey
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
        { name: 'unread_messages',  type: 'int', defaultValue: 0 },
        { name: 'isPrivate', type: 'boolean', defaultValue: false },
        { name: 'isRoom',    type: 'boolean', defaultValue: true },
        { name: 'joined',    type: 'boolean', defaultValue: false }
    ],

    hasMany:[
        { model: 'WebRTC.model.chat.RoomMember', name: 'members' }
    ]

});

// 1_MX40NTI1NDI2Mn5-MTQzMzk1NTY3NDMyMn5Xd0FpdUFYSEdFaVUwaVY4M3ZTS3RyT2p-UH4
// 1_MX40NTI1NDI2Mn5-MTQzNDE0MDE2ODcxN35Vb0xRRkdSQmRtbzZUR1JyeUhvMUhRSjN-fg