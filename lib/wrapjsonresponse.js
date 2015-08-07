module.exports = function (data){
    var response = [].concat(data);
    return {
        "success": true,
        "message": "Successful",
        "total": response.length,
        "timestamp": new Date(),
        "data" : response
    }
};