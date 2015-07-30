Ext.define('WebRTC.view.settings.AdminModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.settingsadmin',
    data:{
        __adminSettings: null
    },
    links: {
        adminSettings: {
            type: 'WebRTC.model.AdminSettings',
            id: 0
        }
    }
});