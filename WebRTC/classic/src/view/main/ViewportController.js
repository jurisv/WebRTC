Ext.define('WebRTC.view.main.ViewportController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.mainviewport',
    listen: {
        controller: {
            'opentok': {  //all events should pass a reference to a view beneath here
            }
        },
        component: {
            'chatrooms': {
                select: 'onRoomSelect'
            }
        }
    },

    init: function() {
         var me = this,
             user = Ext.util.Cookies.get('user');

         if(!user){
             Ext.Msg.prompt('Username','Please enter your name',function(buttonId,value){
                 if(value) {
                     //set the persons name
                     var expires = new Date("October 13, 2095 11:13:00"),
                         newUser = value;
                     me.getViewModel().set('name', value);
                     Ext.util.Cookies.set('user',newUser, expires);

                     Ext.toast({
                         html: newUser + ' give us a moment while we set things up.',
                         title: 'Welcome',
                         width: 400,
                         align: 't'
                     });

                     me.doOpenTokInit();

                 }
             });
         }else{

             Ext.toast({
                 html: 'Glad to see you again ' + user + '.',
                 title: 'Welcome Back',
                 width: 400,
                 align: 't'
             });

             me.doOpenTokInit();

         }


    },

    onRoomSelect: function(view,record){
        var me = this,
            roomtabs = this.lookupReference('roomtabs'),
            tab,
            room;

        if(!record) return false;

        room = {
            xtype: 'chatroom',
            closable: true,
            iconCls: 'x-fa fa-comments',
            viewModel:{
                data: {
                    room: record.data
                }
            },
            flex: 1
        };

        Ext.suspendLayouts();
        tab = roomtabs.insert(1, room);

        if(record.get('provider') == 'OpenTok' ){
            var data = record.get('providerData');
            me.fireEvent('OTinitSession',tab, data);
        }

        Ext.resumeLayouts(true);
        roomtabs.setActiveTab(tab);

    },

    doOpenTokInit: function(){
        var me = this,
            homeusers = me.lookupReference('homeusers'),
            homerooms = me.lookupReference('homerooms'),
            user = Ext.util.Cookies.get('user');

        homerooms.down('dataview').getViewModel().getStore('rooms').loadData([
            {
                name: 'General',
                jid: null,
                topic: 'Open to all users',
                privacy: 'public',
                owner: 'brad',
                nickname: '',
                myJID: null,
                xmpp_name: null,
                unread_messages: 0,
                num_participants: null,
                isRoom: true,
                joined: false,
                provider: 'OpenTok',
                providerData: {
                    apiKey: '45254262',
                    sessionId: '1_MX40NTI1NDI2Mn5-MTQzNDE0MDE2ODcxN35Vb0xRRkdSQmRtbzZUR1JyeUhvMUhRSjN-fg',
                    token:'T1==cGFydG5lcl9pZD00NTI1NDI2MiZzaWc9OGNkN2IzM2UwOWM0YzQxZmJmYWFmZDJiOTRlOGFlYjFhMGJmZDI5NDpzZXNzaW9uX2lkPTFfTVg0ME5USTFOREkyTW41LU1UUXpOREUwTURFMk9EY3hOMzVWYjB4UlJrZFNRbVJ0YnpaVVIxSnllVWh2TVVoUlNqTi1mZyZjcmVhdGVfdGltZT0xNDM0MTQ3NDc4Jm5vbmNlPTAuMjc2NzkzOTg1NjI3NTkxNiZyb2xlPXB1Ymxpc2hlciZleHBpcmVfdGltZT0xNzM1NzE4NDAwMDAwJmNvbm5lY3Rpb25fZGF0YT1uYW1lJTNEYW5vbnltb3Vz'
                }
            },
            {
                name: 'Boson Epic Chat Room',
                jid: null,
                topic: 'This is the most epic chat room of all time',
                privacy: 'public',
                owner: 'brad',
                nickname: '',
                myJID: null,
                xmpp_name: null,
                unread_messages: 0,
                num_participants: null,
                isRoom: true,
                joined: false,
                provider: 'OpenTok',
                providerData: {
                    apiKey: '45254262',
                    sessionId: '1_MX40NTI1NDI2Mn5-MTQzNDE0MDE2ODcxN35Vb0xRRkdSQmRtbzZUR1JyeUhvMUhRSjN-fg',
                    token:'T1==cGFydG5lcl9pZD00NTI1NDI2MiZzaWc9OGNkN2IzM2UwOWM0YzQxZmJmYWFmZDJiOTRlOGFlYjFhMGJmZDI5NDpzZXNzaW9uX2lkPTFfTVg0ME5USTFOREkyTW41LU1UUXpOREUwTURFMk9EY3hOMzVWYjB4UlJrZFNRbVJ0YnpaVVIxSnllVWh2TVVoUlNqTi1mZyZjcmVhdGVfdGltZT0xNDM0MTQ3NDc4Jm5vbmNlPTAuMjc2NzkzOTg1NjI3NTkxNiZyb2xlPXB1Ymxpc2hlciZleHBpcmVfdGltZT0xNzM1NzE4NDAwMDAwJmNvbm5lY3Rpb25fZGF0YT1uYW1lJTNEYW5vbnltb3Vz'
                }
            }
        ]);

        homerooms.down('dataview').getSelectionModel().select(0);
    },

    onToggleFullScreen: function () {
        if (!document.fullscreenElement &&    // alternative standard method
            !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement ) {  // current working methods
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
            } else if (document.documentElement.msRequestFullscreen) {
                document.documentElement.msRequestFullscreen();
            } else if (document.documentElement.mozRequestFullScreen) {
                document.documentElement.mozRequestFullScreen();
            } else if (document.documentElement.webkitRequestFullscreen) {
                document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }
        }
    }

});
