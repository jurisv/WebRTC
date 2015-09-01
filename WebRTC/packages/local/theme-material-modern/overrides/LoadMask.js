Ext.define('Material.LoadMask', {
    override: 'Ext.LoadMask',

    getTemplate: function() {
        var prefix = Ext.baseCSSPrefix;

        return [
            {
                //it needs an inner so it can be centered within the mask, and have a background
                reference: 'innerElement',
                cls: prefix + 'mask-inner',
                children: [
                    //the elements required for the CSS loading {@link #indicator}
                    {
                        reference: 'indicatorElement',
                        cls: prefix + 'loading-spinner-outer',
                        html: '<svg class="spinner" width="40px" height="40px" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><circle class="path" fill="none" stroke-width="4" stroke-linecap="round" cx="20" cy="20" r="16"></circle></svg>'
                    }
                ]
            }
        ];
    },

    updateMessage: Ext.emptyFn,

    updateMessageCls: Ext.emptyFn
});