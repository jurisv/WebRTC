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
            soundChatCombo = view.down('selectfield[name=chat-sound]'),
            currentEnterSound = settings.getById('enter-sound').get('value'),
            soundEnterCombo = view.down('selectfield[name=enter-sound]'),
            currentLeaveSound = settings.getById('leave-sound').get('value'),
            soundLeaveCombo = view.down('selectfield[name=leave-sound]'),
            currentLaunchRoom = settings.getById('launchroom').get('value'),
            LaunchCombo = view.down('selectfield[name=launchroom]');

        soundChatCombo.setValue(currentChatSound);
        soundEnterCombo.setValue(currentEnterSound);
        soundLeaveCombo.setValue(currentLeaveSound);

        LaunchCombo.setValue(currentLaunchRoom);

    },

    signOut: function () {
        localStorage.removeItem("userStorage-user");
        window.location.href=window.location.href;
    },

    saveSettings: function () {
        var view = this.getView(),
            data = view.getValues(),
            settings = Ext.getStore('Settings');

        // saving only chat-sound so far
        var key = 'chat-sound';
        settings.getById(key).set('value', data[key]);

        key = 'enter-sound';
        settings.getById(key).set('value', data[key]);

        key = 'leave-sound';
        settings.getById(key).set('value', data[key]);

        key = 'launchroom';
        settings.getById(key).set('value', data[key]);


        view.up('navigationview').pop();
    }


});
