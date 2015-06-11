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
        'WebRTC.view.chat.ChatRoom'

    ],

    controller: 'main',
    viewModel: 'main',

    ui: 'navigation',

    deferredRender: false,
    tabBarHeaderPosition: 1,
    titleRotation: 0,
    tabRotation: 0,
   // activeTab: 2,

    header: {
        layout: {
            align: 'stretchmax'
        },
        title: {
            bind: {
                text: '{appName}'
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
            // xtype: 'roomlist'
        },{
            xtype: 'mainlist'
        }]
    },{
        title: 'UserMedia',
        iconCls: 'fa-user',
        layout: 'center',
        hidden: true,
        items: [{
            // xtype: 'UserMedia',
            width: 640,
            height: 480

        }]
    }, {
        title: 'Video',
        iconCls: 'fa-users',
        layout: 'border',
        items: [{
            xtype: 'panel',
            bind: {
                title: '{name}'
            },
            itemId: 'publisher',
            region: 'center',
            layout: 'fit',
            width: '50%'


        },{
            xtype: 'panel',
            itemId: 'subscribers',
            autoScroll: true,
            width: '50%',
            // split:true,
            // collapsible: true,
            // collasped:false,
            region: 'east'
        }],
        listeners:{
           // activate: 'onPublisherActivate'
        }
    }, {
        title: 'Chat',
        iconCls: 'fa-weixin',
        xtype: 'chatroom'
    }]
});
