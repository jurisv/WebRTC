Ext.define('WebRTC.view.chat.Info', {
    extend: 'Ext.Panel',
    xtype: 'chatinfo',

    bind : {
        data : {
            bindTo:'{room}',
            deep: true
        }
    },

    initComponent: function(){
        var me = this;

        me.tpl = new Ext.XTemplate(
            '<div class="room-data">',
            '<div class="room-title">{[this.getIcon(values.isPrivate)]} {name}</div>',
            '<div class="room-description">{topic}&nbsp;</div>',
            '</div>',
            {
                getIcon: function(isPrivate){
                    if(isPrivate){
                        return '<span class="x-fa fa-shield fa-lg room-icon"></span>'
                    }else{
                        return '<span class="x-fa fa-comments fa-lg room-icon"></span>'
                    }
                }
            }
        );

        me.callParent();
    }

});