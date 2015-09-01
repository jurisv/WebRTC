Ext.define('Material.FloatingActionButton', {
    extend: 'Ext.Button',
    xtype: 'floatingactionbutton',

    cls: 'material-floating-action-button',

    floating: true,
    hidden: true,
    width: 55,
    height: 55,

    style: 'position: absolute;'
});