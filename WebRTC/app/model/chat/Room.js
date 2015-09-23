Ext.define('WebRTC.model.chat.Room', {
    extend: 'Ext.data.Model',
    idProperty: 'id',
    requires: ['Ext.data.identifier.Uuid'],
    identifier: 'uuid', //creates a uuid and assisgns it to the id field

    // Room fields based on xmpp but not all implemented yet.
    fields: [
        { name: 'id', type: 'string'  },
        { name: 'sessionId', type: 'string'  },     //Tokbox SessionId
        { name: 'apiKey', type: 'number'  },        //Tokbox apiKey
        { name: 'name', type: 'string'  },
        { name: 'owner', type: 'string'  },
        { name: 'topic', type: 'string'  },
        // { name: 'jid', type: 'string'  },
        // { name: 'privacy', type: 'string'  },
        // { name: 'nickname', type: 'string'  },
        /*{ name: 'myJID', type: 'string'  , convert: function(v, record){
            return record.get('jid') + '/' + record.get('nickname');
        }},*/
        // { name: 'xmpp_name', type: 'string'  },    // The associated XMPP client
        // {  name: 'num_participants', type: 'string' },
        // { name: 'unread_messages',  type: 'int', defaultValue: 0 },
        { name: 'isPrivate', type: 'boolean', defaultValue: false },
        { name: 'isRoom',    type: 'boolean', defaultValue: true }
        // { name: 'joined',    type: 'boolean', defaultValue: false }
    ],

    hasMany:[
  //      { model: 'WebRTC.model.chat.RoomMember', name: 'members' },
        { model: 'WebRTC.model.chat.Message', name: 'messages' }
    ],
    proxy: {
        type: 'socketio',
        url : '/rooms',
        apiEvents: {
            read: 'child_added',
            update: 'child_changed',
            destroy: 'child_removed'
        },
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }

});
