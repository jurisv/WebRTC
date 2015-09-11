module.exports = function (data, success, message){
    var response = [].concat(data);
    if(success == null)
        success = true;
    return {
        "success":  success,
        "message": message || "Successful",
        "total": response.length,
        "timestamp": new Date(),
        "data" : response
    }
};