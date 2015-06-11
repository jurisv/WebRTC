/**
 * This view is an example list of people.
 */
Ext.define('WebRTC.view.main.List', {
    extend: 'Ext.grid.Panel',
    xtype: 'mainlist',

    requires: [
        'WebRTC.store.Personnel'
    ],

    title: 'Users On',

    store: {
        type: 'personnel'
    },

    columns: [
        { text: 'Name',  dataIndex: 'name', flex: 1 },
        { text: 'Broadcasting', dataIndex: 'publishing'}
    ],

    listeners: {
        select: 'onItemSelected'
    }
});
