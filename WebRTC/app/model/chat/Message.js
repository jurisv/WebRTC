Ext.define('WebRTC.model.chat.Message', {
    extend: 'Ext.data.Model',
    idProperty: 'id',
    requires: ['Ext.data.identifier.Uuid'],
    identifier: 'uuid', //creates a uuid and assisgns it to the id field

    config: {
        fields: [
            { name: 'id', type: 'string'},
            { name: 'room_id', reference: 'Room' },
            { name: 'timeid', type: 'string',
              depends: [ 'date' ],
              convert: function(value, record){
                var date = record.get('date');
                return Ext.Date.format(date, 'd-m-Y-H-i-s');
            }},
            { name: 'message', type: 'string'  },
            { name: 'from', type: 'string'  },
            { name: 'mine', type: 'boolean' },
            { name: 'user', type: 'object'  },


            { name: 'date', type: 'date' },
            { name: 'shortDate',
              type: 'string',
              depends: [ 'date' ],
              calculate: function(record){
                var now = new Date(),
                    date = record.date,
                    days = parseInt((now.getTime() - date.getTime())/(24*3600*1000)),
                    sameDay = parseInt(Ext.Date.format(date, 'dm')) == parseInt(Ext.Date.format(now, 'dm'));

                if(sameDay){
                    return Ext.Date.format(date, 'g:i A');
                }
                else if(days < 6){
                    return Ext.Date.dayNames[date.getDay()];
                }
                else{
                    return Ext.Date.format(date, 'M j');
                }
            }}
        ],
        hasMany: { model: 'WebRTC.model.File', name: 'attachments' }
    },
    proxy: {
        // type: 'socketio',
        type: 'memory',
        url : '/messages',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});