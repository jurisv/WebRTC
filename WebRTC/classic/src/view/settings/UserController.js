Ext.define('WebRTC.view.settings.UserController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.settingsuser',

    requires: [
        'WebRTC.store.Settings'
    ],

    init: function () {
        var view = this.getView(),
            settings = Ext.getStore('Settings'),
            currentChatSound = settings.getById('chat-sound').get('value'),
            soundCombo = view.down('combo[name=chat-sound]');

        soundCombo.setValue(currentChatSound);
    },

    saveSettings: function () {
        var view = this.getView(),
            data = view.getForm().getFieldValues(),
            settings = Ext.getStore('Settings');

        // saving only chat-sound so far
        var key = 'chat-sound';
        settings.getById(key).set('value', data[key]);

        view.up('window').close(); //TODO: Maybe settings.User has to be a window itself
    }   


});
