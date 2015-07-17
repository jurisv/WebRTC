Ext.define('WebRTC.view.chat.RoomForm', {
    extend: 'Ext.form.Panel',
    xtype: 'chatroomform',

    bodyPadding: 10,
    autoScroll: true,

    defaultFocus: 'textfield [name=name]',
    defaultButton: 'okButton',


    items: [
        {
            xtype: 'fieldset',
            title: 'Info',
            defaults:{
                anchor: '100%'
            },
            items: [
                {
                    xtype:'textfield',
                    fieldLabel: 'Room Name',
                    name: 'name'
                },
                {
                    xtype:'checkboxfield',
                    boxLabel  : 'Private',
                    name      : 'private',
                    inputValue: '1'
                }
            ]
        }
    ],

    bbar:[
        {
            iconCls: 'x-fa fa-thumbs-o-down',
            action:'cancel',
            hidden: true,
            text:'Cancel'
        }
        ,'->',
        {
            iconCls: 'x-fa fa-thumbs-o-up',
            reference: 'okButton',
            action:'ok',
            formBind: true,
            text:'OK'
        }
    ]

});
