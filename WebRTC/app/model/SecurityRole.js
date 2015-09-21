Ext.define("WebRTC.model.SecurityRole",{
    extend: "Ext.data.Model",
    idProperty: 'id',
    requires: ['Ext.data.identifier.Uuid'],
    identifier: 'uuid', //creates a uuid and assisgns it to the id field
    fields:[
        {name: 'id',  type: 'string' },
        {name: 'roleName', type: 'string'},
        {name: 'description', type: 'string'},
        {name: 'serviceFee', type: 'float'},
        {name: 'billingFrequency', type: 'string'},
        {name: 'trialPeriod', type: 'int'},
        {name: 'trialFrequency', type: 'string'},
        {name: 'billingPeriod', type: 'int'},
        {name: 'trialFee', type: 'float'},
        {name: 'isPublic', type: 'bool'},
        {name: 'autoAssignment', type: 'bool'},
        {name: 'securityRoleGroupID', type: 'string'},
        {name: 'RSVPCode', type: 'string'},
        {name: 'iconFile', type: 'string'},
        {name: 'createdByUserID', type: 'string'},
        {name: 'createdOnDate', type: 'date'},
        {name: 'lastModifiedByUserID', type: 'string'},
        {name: 'lastModifiedOnDate', type: 'date'}
    ],
    proxy: {
        type: 'socketio',
        url : '/securityroles',
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