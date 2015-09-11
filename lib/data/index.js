var OpenTok = require('opentok'); // OpenTok WebRTC service calls  http://www.tokbox.com

module.exports = function(nconf){

    var wrap = require('./../wrapjsonresponse.js'),
        firebase = require('./../firebase.db.js')(nconf);

    var stores = {

        _nconf: nconf,

        _getToken: function (req, res, id){
            var session = id,
                ApiKey = process.env.OpenTokApi || this._nconf.get('adminsettings').serviceprovider.opentok.ApiKey,
                ApiSecret = process.env.OpenTokSecret || this._nconf.get('adminsettings').serviceprovider.opentok.SecretKey,
                opentok = new OpenTok(ApiKey, ApiSecret),
                role, name, token, data;

            if(req.body){
                role = req.body['role'] || 'publisher';
                name = req.body['name'] || 'anonymous';
            }else{
                role = 'publisher';
                name = 'anonymous';
            }

            token = opentok.generateToken(session,{
                role :       role,
                // expireTime : tokenExpires,
                data :       'name=' + name
            });

            data = {
                apiKey: ApiKey || '',
                sessionId: session,
                token: token
            };
            //send the global app sessionId setup during startup
            res.status(200).send(data);
        },

        //a token for a room
        addtoken: function(req, res, id){
            this._getToken(req, res, id)
        },

        //a token for a room
        gettoken: function(req, res, id){
            this._getToken(req, res, id)
        },

        addjwtsign: function(req, res, id){
            var jwt = require('jsonwebtoken'),
                data = req.body,
                pwd = id;

            var token = jwt.sign(data,pwd);
            res.status(200).send(token);

        },

        getjwtdecode: function(req, res, id){
            var jwt = require('jsonwebtoken'),
                token = id,
                pwd = req.query['pwd'] ||  req.body['pwd'];

            jwt.verify(token, pwd, function(err, decoded) {
               if(err){
                   res.status(500).send(err);
               }else{
                   res.status(200).send(decoded);
               }
            });
        },

        getuser: function(req, res, id){
            if(id){
                var  firebase = require('./../firebase.db.js')(nconf);
                firebase.child('users/' + id ).once('value', function(childSnapshot, prevChildName) {
                    if (childSnapshot.val() && childSnapshot.val() != undefined){
                        var data = childSnapshot.val();
                        res.status(200).send( wrap(data) );
                    }else{

                    }
                });
            }
        },

        adduser: function(req, res, id){
            var user;
            if(req.body){
                user = req.body;
                firebase.createUser({
                    email    : req.body['email_userid'],
                    password : req.body['password']
                }, function(error, userData) {
                    if (error) {
                        console.log("Error creating user:", error);
                        res.status(401).send( wrap(null,false,error) );
                    } else {
                        console.log("Successfully created user account with uid:", userData.uid);
                        user.id = userData.uid;
                        user.password = null;   //not saved in user record

                        firebase.child('users').child(userData.uid).update(user);
                        res.status(200).send( wrap(user) );
                    }
                });
            }
        },

        setuser: function(req, res, id){

        }


        //moved login to client side with firebase.
        /*
        addlogin: function(req, res, id){
            this.getlogin(req, res, id);
        },

        getlogin: function(req, res, id){
            var user,
                firebase = require('./../firebase.db.js')(nconf);
            if(req.body){
                user = req.body;
                firebase.authWithPassword({
                    email    : user.userid,
                    password : user.password
                }, function(error, authData) {
                    if (error) {
                        console.log("Error with login:", error);
                        res.status(401).send(wrap({},false,error));
                    } else {
                        console.log("Authenticated successfully with payload:", authData);
                        res.status(200).send( wrap(authData.uid) );
                    }
                });
            }


        }
        */

    };

    return stores
};