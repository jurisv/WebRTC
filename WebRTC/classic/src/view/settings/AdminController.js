Ext.define('WebRTC.view.settings.AdminController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.settingsadmin',

    onOkClick: function(button){

        var me = this,
            window = button.up('window'),
            form = window.down('form'),
            data = form.getValues();


        if (form.isValid()) {

            Ext.Msg.wait('Saving', 'Saving initial settings...');
            var record = form.getViewModel().data.adminSettings;

            form.updateRecord(record);

            record.save({
                scope: this,
                callback: this.onComplete
            });
            form.up('window').close();
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