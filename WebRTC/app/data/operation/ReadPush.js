Ext.define('WebRTC.data.operation.ReadPush', {
    extend: 'Ext.data.operation.Read',
    alias: 'data.operation.readpush',
    
    action: 'read',

    isReadOperation: true,

    triggerCallbacks: function() {
console.log('trigger')        
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
})
