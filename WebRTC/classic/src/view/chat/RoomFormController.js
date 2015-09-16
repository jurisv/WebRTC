Ext.define('WebRTC.view.chat.RoomFormController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.chatroomform',

    onOkClick: function(button) {
    var window = button.up('window'),
        form = window.down('form'),
        data = form.getValues(),
        userid = button.up('chatroomscontainer').getViewModel().get('user').id,
        store = button.up('chatroomscontainer').getViewModel().getStore('rooms');


    if (form.isValid()) {

        //If there is no view model created then it is new otherwise the model has the record
        if ( window.getViewModel().get('id') != null )
        {
            var record = window.getViewModel().get('theRoom');
            Ext.Msg.wait('Saving', 'Saving room...');
            form.up('window').close();
            record.save({
                scope: this,
                callback: this.onComplete
            });

        } else {
            Ext.Msg.wait('Creating', 'Creating room...');
            data.owner = userid;
            store.add(data);
            form.up('window').close();
            store.sync({
                scope: this,
                callback: this.onComplete
            });
        }
    }
},

    onComplete: function() {
    var title = Ext.Msg.getTitle();
    Ext.Msg.hide();

    Ext.toast({
        title: title,
        html:  'Finished successfully',
        align: 't',
        bodyPadding: 10
    });
}

});