Ext.define('WebRTC.model.chat.Message', {
    extend: 'Ext.data.Model',
    idProperty: 'id',
    requires: ['Ext.data.identifier.Uuid'],
    identifier: 'uuid', //creates a uuid and assisgns it to the id field
    
    fields: [
        'id',
        'roomid',
        { 
            name: 'timeid', type: 'string',
            depends: [ 'date' ],
            convert: function(value, record){
                var date = new Date(record.get('date'));
                return Ext.Date.format(date, 'd-m-Y-H-i-s');
            }
        },
        'message',
        'from',
        { 
            name: 'mine', 
            type: 'boolean', 
            persist :false, 
            defaultValue: false
        },
        'user',
        { 
            name: 'date'
            // type: 'date',
            // dateFormat: '' 
        },
        { 
            name: 'shortDate',
            type: 'string',
            depends: [ 'date' ],
            calculate: function(data){
                var now = new Date(),
                    date = new Date(data.date),
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
            }
        }
    ],

    // hasMany: { model: 'WebRTC.model.File', name: 'attachments' },
    
    proxy: {
        // type: 'memory',
        type: 'socketio',
        url : '/messages',
        extraParams: {
            room: null
        },
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
    }
});