Ext.define('Material.container.plugin.FlexibleToolbar', {
    extend: 'Ext.plugin.Abstract',

    alias: 'plugin.materialflexibletoolbar',

    init: function (container) {
        container.on('afterrender', this.onAfterRender, this);
    },

    onAfterRender: function (container) {
        container.body.child('[data-ref=innerCt]').insertFirst({ cls: 'material-flexible-toolbar' });
    }

});