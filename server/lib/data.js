var data = {

    wrapresponse: function  (data,total){
        return {
                "success": true,
                "message": "Successful",
                "total": total,
                "timestamp": new Date(),
                "data" : data
        }
    },

    getGlobal: function (req, res){
        var session = App.get('sessionId'),
            token = global.opentok.generateToken(session),
            data = {
                apiKey: '45254262',
                sessionId: session,
                token: token
            };
        //send the global app sessionId setup during startup
        res.status(200).send(data);
    },

    GET_users: function(req, res){
        res.status(200).send('user');
    },
    GET_rooms: function(req, res){
        res.status(200).send({rooms:'hi'});
    },
    POST_global: function(req, res){
        this.getGlobal(req, res)
    },
    GET_global: function(req, res){
        this.getGlobal(req, res)
    }


};

module.exports = data;