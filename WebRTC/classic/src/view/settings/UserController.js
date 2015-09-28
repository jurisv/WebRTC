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
            soundChatCombo = view.down('combo[name=chat-sound]'),
            currentEnterSound = settings.getById('enter-sound').get('value'),
            soundEnterCombo = view.down('combo[name=enter-sound]'),
            currentLeaveSound = settings.getById('leave-sound').get('value'),
            soundLeaveCombo = view.down('combo[name=leave-sound]'),
            currentLaunchRoom = settings.getById('launchroom').get('value'),
            LaunchCombo = view.down('combo[name=launchroom]');

        soundChatCombo.setValue(currentChatSound);
        soundEnterCombo.setValue(currentEnterSound);
        soundLeaveCombo.setValue(currentLeaveSound);

        LaunchCombo.setValue(currentLaunchRoom);

    },

    signOut: function () {
        this.fireEvent('logout');
    },

    onChangePassword: function(){
        this.redirectTo('#newpassword');
    },

    onChangeEmail: function(){
        this.redirectTo('#newemail');
    },

    saveSettings: function () {
        var view = this.getView(),
            data = view.getForm().getFieldValues(),
            auth = WebRTC.app.getController('Auth'),
            user = Ext.first('app-main').getViewModel().get('user'),
            userId = user['id'],
            settings = Ext.getStore('Settings');

        auth.firebaseRef.child('users/' + userId).update({
            fn: data['fn'],
            location: data['location'],
            status_msg: data['status_msg'],
            gender: data['gender'],
            country: data['country'],
            state: data['state'],
            title: data['title'],
            tel_work: data['tel_work'],
            tel_cell: data['tel_cell'],
            company: data['company'],
            name: data['fn']
        });


        // saving only chat-sound so far
        var key = 'chat-sound';
        settings.getById(key).set('value', data[key]);

        key = 'enter-sound';
        settings.getById(key).set('value', data[key]);

        key = 'leave-sound';
        settings.getById(key).set('value', data[key]);

        key = 'launchroom';
        settings.getById(key).set('value', data[key]);


        view.up('window').close(); //TODO: Maybe settings.User has to be a window itself
    }   


});
