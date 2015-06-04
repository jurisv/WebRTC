
function wrapresponse (data,total){
    return {
            "success": true,
            "message": "Successful",
            "total": total,
            "timestamp": new Date(),
            "data" : data
    }
}

var data = {
    GET_users: function(req, res){
        res.status(200).send('user');
    },
    index: function(req, res){
    },
    show: function(req, res){
        res.send('show');
    },
    edit: function(req, res){
        res.send('edit');
    },
    destroy: function(req, res){
        res.send('destroy');
    },
    range: function(req, res ){ //a, b, format
        res.send('range');
    }
};

module.exports = data;