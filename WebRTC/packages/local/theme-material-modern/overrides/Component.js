Ext.define('Material.override.Component', {
    override: 'Ext.Component',

    // override:
    // Don't add component to Viewport if a parent is given.
    // This is helpful when wanting to inherit the parent's view controller.
    showBy: function(component, alignment) {
        var me = this,
            viewport = Ext.Viewport,
            parent = me.getParent();

        me.setVisibility(false);

        if (!parent && viewport) {
            viewport.add(me);
        }

        me.show();

        me.on({
            hide: 'onShowByErased',
            destroy: 'onShowByErased',
            single: true,
            scope: me
        });
        component.on('resize', 'alignTo', me, { args: [component, alignment] });

        me.alignTo(component, alignment);
        me.setVisibility(true);
    }
});