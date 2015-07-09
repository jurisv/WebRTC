Ext.define('WebRTC.model.RoomMessage', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            { name: 'id', type: 'string',  convert: function(value, record){

                var date = record.get('date');
                return Ext.Date.format(date, 'd-m-Y-H-i-s');

            }},
            { name: 'message', type: 'string'  },
            { name: 'from', type: 'string'  },
            { name: 'mine', type: 'boolean' },
            { name: 'user', type: 'object'  },


            { name: 'xmpp_name', type: 'string'  },   // The name of the xmpp client associated to this message
            { name: 'date', type: 'date'    },
            { name: 'shortDate', type: 'string'  ,    convert: function(value, record){

                var now = new Date(),
                    date = record.get('date'),
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
        type: 'memory',
        reader: {
            type: 'json'
        }
    }
});