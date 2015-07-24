Ext.define('WebRTC.data.operation.Destroy', {
    extend: 'Ext.data.operation.Destroy',
    alias: 'data.operation.destroypush',
    
    action: 'destroy',

    isDestroyOperation: true,

    order: 30,

    foreignKeyDirection: -1,

    // config: {
    //     addRecords: false
    // },

    doProcess: function( resultSet, request, response ) {
        var clientRecords = resultSet.getRecords(),
            clientLen = clientRecords.length,
            i;
        
        for (i = 0; i < clientLen; ++i) {
            clientRecords[i].setErased();
        }

        this.setRecords(clientRecords);
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