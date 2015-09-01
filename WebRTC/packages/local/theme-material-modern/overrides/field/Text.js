Ext.define('Material.field.Text', {
    override: 'Ext.field.Text',

    listeners: {
        change: function (field, value) {
            if (value) {
                field.el.addCls('not-empty');
            }
        },
        focus: function () {
            this.addCls('had-focus');
        }
    }
});