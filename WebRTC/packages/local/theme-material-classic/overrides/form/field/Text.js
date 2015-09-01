Ext.define('Material.form.field.Text', {
    override: 'Ext.form.field.Text',

    labelAlign: 'top',
    labelSeparator: '',

    listeners: {
        change: function (field, value) {
            field.el[value ? 'addCls' : 'removeCls']('not-empty');
        },
		focus: function () {
            this.addCls('had-focus');
		}
    }
});