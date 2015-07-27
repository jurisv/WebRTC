Ext.define('WebRTC.data.operation.UpdatePush', {
    extend: 'Ext.data.operation.Update',
    alias: 'data.operation.updatepush',
    
    action: 'update',

    isUpdateOperation: true,

    order: 20,
    
    doProcess: function( resultSet, request, response ) {
        var records = resultSet.getRecords(),
            len = records.length,
            store = this.getInternalScope(),
            idProperty = store.getModel().idProperty,
            clientRecords = [],
            i;


        for (i = 0; i < len; ++i) {
            clientRecords.push(store.getById(records[i][idProperty]));
        }

        this.setRecords(clientRecords);
        this.callParent(arguments);

    },


    triggerCallbacks: function() {
        var me = this,
            callback = me.getInternalCallback();

        // Call internal callback first (usually the Store's onProxyLoad method)
        if (callback) {
            callback.call(me.getInternalScope() || me, me);
            // me.setInternalCallback(null);
            // me.setInternalScope(null);
        }

        // Call the user's callback as passed to Store's read/write
        if (callback = me.getCallback()) {
            // Maintain the public API for callback
            callback.call(me.getScope() || me, me.getRecords(), me, me.wasSuccessful());
            me.setCallback(null);
            me.setScope(null);
        }
    }    
});
