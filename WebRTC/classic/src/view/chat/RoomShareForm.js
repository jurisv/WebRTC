Ext.define('WebRTC.view.chat.RoomShareForm', {
    extend: 'Ext.form.Panel',
    xtype: 'chatroomshareform',

    bodyPadding: 10,
    autoScroll: true,

    controller: 'chatroomshareform',

    /*
     * Seek out the first enabled, focusable, empty textfield when the form is focused
     */
    defaultFocus: 'textfield:focusable:not([hidden]):not([disabled]):not([value])',

    defaultButton: 'okButton',
    defaults:{
        anchor: '100%',
        labelWidth: 200
    },


    items: [
        {
            xtype: 'label',
            reference: 'statusLabel',
            cls: 'status-top-label',
            hidden: true,
            text: 'An error has occurred'
        },
        {
            xtype: 'fieldset',
            title: 'Info',
            defaults:{ anchor: '100%'},
            items: [
                {
                    xtype:'displayfield',
                    fieldLabel: 'Room Name',
                    name: 'name',
                    bind: '{theRoom.name}'
                },
                {
                    xtype:'displayfield',
                    fieldLabel: 'Room Link',
                    name: 'link',
                    bind: '{theMessage}'
                }
            ]
        },
        {
            xtype: 'fieldset',
            title: 'Invite People',
            items: [
                {
                    xtype:'container',
                    layout:'hbox',
                    items:[

                        {
                            xtype:'textfield',
                            fieldLabel: 'Email',
                            flex:1,
                            name: 'email'
                        },
                        {
                            xtype:'button',
                            iconCls: 'x-fa fa-exchange',
                            reference: 'inviteButton',
                            action:'ok',
                            formBind: true,
                            handler: 'onInviteClick',
                            text:'Invite'
                        }

                    ]
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
            handler: 'onOkClick',
            text:'OK'
        }
    ]

});
