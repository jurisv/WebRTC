/**
 * This class provides the modal Ext.Window support for all Authentication forms.
 * It's layout is structured to center any Authentication dialog within it's center,
 * and provides a backGround image during such operations.
 */
Ext.define('auth.view.authentication.LockingWindow', {
    extend: 'Ext.Panel',
    xtype: 'lockingwindow',

    requires: [
        'auth.view.authentication.AuthenticationController'
    ],

    cls: 'auth-locked-window',
    layout: 'fit',
    controller: 'authentication',

    updateStatus: function(text){
       var statusLabel =  this.down('[reference=statusLabel]');
       if(statusLabel){
           statusLabel.setHtml(text);
           statusLabel.show();
       }
    }
});
