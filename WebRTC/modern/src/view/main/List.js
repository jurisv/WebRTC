/**
 * This view is an example list of people.
 */
Ext.define('WebRTC.view.main.List', {
    extend: 'Ext.grid.Grid',
    xtype: 'mainlist',

    requires: [
        'WebRTC.store.Personnel'
    ],

    title: 'Users On',

    store: {
        type: 'personnel'
    },

    columns: [
        { text: 'Name',  dataIndex: 'name', width: 250 },
        { text: 'Broadcasting', dataIndex: 'email', width: 80 }
    ],

    listeners: {
        select: 'onItemSelected'
    }
});
