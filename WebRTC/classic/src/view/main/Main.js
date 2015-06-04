Ext.define('WebRTC.view.main.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'app-main',

    requires: [
        'Ext.plugin.Viewport',
        'Ext.window.MessageBox',

        'WebRTC.view.main.MainController',
        'WebRTC.view.main.MainModel',
        'WebRTC.view.main.List',

        'WebRTC.view.main.UserMedia',
        'WebRTC.view.chat.ChatMain'

    ],

    controller: 'main',
    viewModel: 'main',

    ui: 'navigation',

    tabBarHeaderPosition: 1,
    titleRotation: 0,
    tabRotation: 0,
    activeTab: 3,

    header: {
        layout: {
            align: 'stretchmax'
        },
        title: {
            bind: {
                text: '{name}'
            },
            flex: 0
        },
        iconCls: 'fa-th-list'
    },

    tabBar: {
        flex: 1,
        layout: {
            align: 'stretch',
            overflowHandler: 'none'
        }
    },

    responsiveConfig: {
        tall: {
            headerPosition: 'top'
        },
        wide: {
            headerPosition: 'left'
        }
    },

    defaults: {
        bodyPadding: 20,
        tabConfig: {
            plugins: 'responsive',
            responsiveConfig: {
                wide: {
                    iconAlign: 'left',
                    textAlign: 'left'
                },
                tall: {
                    iconAlign: 'top',
                    textAlign: 'center',
                    width: 120
                }
            }
        }
    },

    items: [{
        title: 'Home',
        iconCls: 'fa-home',
        // The following grid shares a store with the classic version's grid as well!
        items: [{
            xtype: 'mainlist'
        }]
    }, {
        title: 'UserMedia',
        iconCls: 'fa-user',
        layout: 'center',
        items: [{
            xtype: 'UserMedia',
            width: 640,
            height: 480

        }]
    }, {
        title: 'PeerToPeer',
        iconCls: 'fa-users',
        layout: 'column',
        autoScroll: true,
        items: [{
            xtype: 'UserMedia',
            width: '40%'

        },{
            xtype: 'UserMedia',
            width: '40%'

        }]
    }, {
        title: 'DataChannel',
        iconCls: 'fa-database',
        xtype: 'chatmain'
    }]
});
