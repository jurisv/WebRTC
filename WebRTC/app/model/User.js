/**
 * @class WebRTC.model.User
 * @extend Ext.data.Model
 * Model which contains all the informations
 * related to a single user.
 */
Ext.define('WebRTC.model.User', {
    extend: 'Ext.data.Model',
    idProperty: 'id',

    proxy: {
        type: 'socketio',
        url : '/users',
        apiEvents: {
            read: 'child_added',
            update: 'child_changed',
            destroy: 'child_removed'
        },
        reader: {
            type: 'json',
            rootProperty: 'data'
        },
        writer: {
            type: 'json',
            writeAllFields: true
        }
    },
    /*
    proxy: {
        type: 'rest',
        url: '/data/user',
        reader: {
            type: 'json',
            rootProperty: 'data'
        },
        writer: {
            type: 'json'
        }
    },*/


    fields: [
        { name: 'id',               type: 'string'                            },
        { name: 'gender',           type: 'string'                            },
        { name: 'jid',              type: 'string'                            },
        { name: 'is_xmpp',          type: 'boolean', defaultValue: false      },
        { name: 'xmpp_name',        type: 'string'                            },    // The associated XMPP client
        { name: 'xmpp_provider',    type: 'string'                            },
        { name: 'group',            type: 'string',
            convert: function(v, record){
            return record.get('is_xmpp') ? record.get('xmpp_name') : 'IO';
        }
        },
        { name: 'status',           type: 'string',  defaultValue: 'offline'  },
        { name: 'statusOrder',      type: 'int',  defaultValue: 0  },
        { name: 'name',             type: 'string'                            },
        { name: 'mention_name',     type: 'string'                            },
        { name: 'unread_messages',  type: 'int',     defaultValue: 0          },
        { name: 'status_msg',       type: 'string'                            },
        { name: 'vCard'                                                       },     // The raw vCard object

        // The following fiends are update by the XMPP vCard object
        { name: 'fn',             type: 'string' },
        { name: 'nickname',       type: 'string' },
        { name: 'photo',          type: 'string',    defaultValue: null       },
        { name: 'title',          type: 'string' },
        { name: 'email_userid',   type: 'string' },
        { name: 'email_home',     type: 'string' },
        { name: 'email_work',     type: 'string' },
        { name: 'email_internet', type: 'string' },

        // This field is choose from all the informations we have
        { name: 'email_pref',     type: 'string',
            convert: function(v, record){

            var emailUserId = record.get('email_userid');

            if(emailUserId){
                return emailUserId;
            }

            return '';

        }
        },

        { name: 'n_family',       type: 'string' },
        { name: 'n_given',        type: 'string' },
        { name: 'n_middle',       type: 'string' },
        { name: 'n_prefix',       type: 'string' },
        { name: 'n_suffix',       type: 'string' },

        { name: 'tel_home',       type: 'string',    defaultValue: null },
        { name: 'tel_work',       type: 'string',    defaultValue: null },
        { name: 'tel_fax',        type: 'string',    defaultValue: null },
        { name: 'tel_pager',      type: 'string',    defaultValue: null },
        { name: 'tel_cell',       type: 'string',    defaultValue: null },

        // This field is choose from all the informations we have
        { name: 'display_name', type: 'string',
            convert: function(v, record){

                var fn = record.get('fn'),
                    name = record.get('name');

                if(!Ext.isEmpty(fn)){
                    return fn;
                }
                else if(name){
                    return name;
                }

                return record.getId();

            }
        }

    ],


    getCallNumber : function() {
        var me = this;
        return me.get('tel_cell') || me.get('tel_work') || me.get('tel_home');
    },

    /**
     * Update the user informations from the provided
     * XMPP vCard object.
     * @param {Object} vCard The user XMPP vCard object
     */
    setVCard: function(vCard){

        // Get the associated XMPP provider
        var me = this,
            provider = this.get('xmpp_provider');

        for(field in vCard){

            if(Ext.isString(vCard[field])){
                me.set(field, vCard[field]);
            }
            else{
                for(subfield in vCard[field]){
                    me.set(Ext.String.format('{0}_{1}', field, subfield), vCard[field][subfield]);
                }
            }

        }

        if(provider === 'facebook'){
            var fbuid = me.get('jid').split('@')[0].replace('-','');
            me.set('photo', Ext.String.format('http://graph.facebook.com/{0}/picture?type=large', fbuid));
        }
        else if(provider === 'google'){
            me.set('photo', Ext.String.format('data:image/jpg;base64,{0}', vCard.photo.binval));
        }

        // Finally update the model field
        me.set('vCard', vCard);

    }

});