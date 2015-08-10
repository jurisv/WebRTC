var OpenTok = require('opentok'); // OpenTok WebRTC service calls  http://www.tokbox.com

module.exports = function(nconf){

    var _opentok = {},
        opentok,
        ApiKey = process.env.OpenTokApi,
        ApiSecret = process.env.OpenTokSecret;

    //Use ENV Vars first then use server-config
    if(!ApiKey && nconf.get('adminsettings').serviceprovider.firebase.SecretKey != undefined) {
        ApiKey = nconf.get('adminsettings').serviceprovider.opentok.ApiKey;
        ApiSecret = nconf.get('adminsettings').serviceprovider.opentok.SecretKey;
        opentok = new OpenTok(ApiKey, ApiSecret);
    }else{
        opentok = new OpenTok(ApiKey, ApiSecret);
    }

    _opentok = {
        getOpenTokSessionId: function (callback) {
            opentok.createSession(function (err, session) {
                    if (err) return console.log(err);
                    callback(null, session.sessionId);
                }
            );
        }
    };

    return _opentok;

};