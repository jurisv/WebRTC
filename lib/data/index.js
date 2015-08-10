var OpenTok = require('opentok'); // OpenTok WebRTC service calls  http://www.tokbox.com

module.exports = function(nconf){

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
        }

    };

    return stores
};