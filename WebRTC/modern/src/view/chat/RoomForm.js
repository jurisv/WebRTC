Ext.define('WebRTC.view.chat.RoomForm', {
    extend: 'Ext.form.Panel',
    xtype: 'chatroomform',

    bodyPadding: 10,
    autoScroll: true,

    defaultFocus: 'textfield [name=name]',
    defaultButton: 'okButton',
    defaults:{
        anchor: '100%',
        labelWidth: 200
    },

    items: [
        {
            xtype: 'fieldset',
            title: 'Info',
            defaults:{
                anchor: '100%'
            },
            items: [
                {
                    xtype:'hiddenfield',
                    name: 'id',
                    bind: '{theRoom.id}'
                },{
                    xtype:'textfield',
                    fieldLabel: 'Room Name',
                    name: 'name',
                    bind: '{theRoom.name}'
                },
                {
                    xtype:'checkboxfield',
                    boxLabel  : 'Private',
                    name      : 'private',
                    bind: '{theRoom.isPrivate}',
                    inputValue: '1'
                }
            ]
        },{
            xtype:'textfield',
            fieldLabel: 'OpenTok SessionId',
            name: 'sessionId',
            disabled: true,
            bind: '{theRoom.id}'
        },{
            xtype: 'toolbar',
            docked: 'bottom',
            items: [{
                iconCls: 'x-fa fa-thumbs-o-down',
                action:'cancel',
                hidden: true,
                text:'Cancel'
            },
                {
                    xtype: 'spacer'
                },{
                    iconCls: 'x-fa fa-thumbs-o-up',
                    reference: 'okButton',
                    action:'ok',
                    formBind: true,
                    text:'OK'
                }]
        }
    ],


    bbar:[

    ]

});
