module.exports = function (data, success, message){
    var response = [].concat(data);
    return {
        "success":  success || true,
        "message": message || "Successful",
        "total": response.length,
        "timestamp": new Date(),
        "data" : response
    }
};