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
            '<div class="room-data"><table><tr>',
            '<td>{[this.getIcon(values.isPrivate)]}</td>',
            '<td>',
            '<div class="room-title">{name}</div>',
            '<div class="room-description">{topic}&nbsp;</div>',
            '</td></tr></table></div>',
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