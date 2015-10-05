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

        addroominvite: function(req, res, id){
            if(undefined == process.env.sendgridKey){
                res.status(401).send( wrap({message: 'This server is not setup to send emails.'}) );
            }else if(req.body){
                var user = JSON.parse(req.body['user']),
                    config = {
                        token: req.body['token'],
                        room: JSON.parse(req.body['room']),
                        message: req.body['message'],
                        toEmail: req.body['email']
                    };


                var ejs = require('ejs'),
                    moment = require('moment'),
                    sendgrid  = require('sendgrid')(process.env.sendgridKey),
                    fs = require('fs'),
                    template = fs.readFileSync(__dirname + '/../../views/email_invite.html', 'utf8'),
                    body = ejs.render(template, {
                        content: config,
                        moment: moment,
                        origin: res.req.headers.origin,
                        isNew: false, //isNew,
                        filename: __dirname + '/../../views/email_invite.html',
                        title: 'Your Invited'
                    });

                sendgrid.send({
                    to:       config.toEmail,
                    from:     user['email_pref'],
                    bcc:      ['brad.schafer@sencha.com'],
                    subject:  'You\'ve been invited to a video conference room',
                    html:     body
                }, function(err, json) {
                    if (err) { return console.error(err); }
                    console.log(json);
                });

                res.status(200).send( wrap({message: config.toEmail + ' invited. '}) );

               /* this.ensureEmailExists(config,function(email,isNew){

                })*/

            }
        },

        ensureEmailExists: function(config,callback){
            var toEmail = config.toEmail,
                tempPassword = 'tempPassword';
            // We need to create a user account and also save the user data.
            firebase.createUser({
                email    : toEmail,
                password : tempPassword
            }, function(error, userData) {
                if (error) {
                    // If the user exists ....
                    callback(toEmail,false);
                } else {
                    var user = {
                        name: toEmail,
                        fn: toEmail,
                        email_userid: toEmail,
                        email_pref: toEmail
                    };

                    firebase.child('users').child(userData.uid).update(user);

                    // now reset password so we don't know what it is.
                    firebase.resetPassword({
                        email: toEmail
                    }, function (error) {
                        if (error === null) {
                            console.log("Password reset email sent successfully");

                        } else {
                            console.log("Error sending password reset email:", error);
                        }
                    });

                    callback(toEmail,true);
                }
            });
        }



    };

    return stores
};


/*
// way to lookup data
 getpasswordreset: function(req,res,id){
 firebase.child('users').orderByChild('email_pref').equalTo(id).once('value',function(snapshot){
 var user = snapshot.val(),
 id = Object.keys(user)[0];
 firebase.child('users/' + id ).update({resetPassword:true});
 });
 res.status(200).send({success:true});
 }




 // Users should be sockets only now
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
 */
