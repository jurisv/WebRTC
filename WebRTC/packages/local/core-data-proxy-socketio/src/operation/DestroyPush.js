Ext.define('Sencha.ux.data.operation.DestroyPush', {
    extend: 'Ext.data.operation.Destroy',
    alias: 'data.operation.destroypush',
    
    action: 'destroy',

    isDestroyOperation: true,

    order: 30,

    foreignKeyDirection: -1,

    doProcess: function( resultSet, request, response ) {
        var records = resultSet.getRecords(),
            len = records.length,
            store = this.getInternalScope(),
            idProperty = store.getModel().idProperty,
            clientRecords = [],
            clientRec, i;


        for (i = 0; i < len; ++i) {
            clientRec = store.getById(records[i][idProperty]);
            // if we remove the record locally, it won't be pressent in the store anymore
            if (clientRec) {
                clientRecords.push(clientRec);    
            }
            
        }
        
        if (clientRecords.length) {
            store.data.remove(clientRecords);
            this.setRecords(clientRecords);
        }

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