/**
 * Facade to use new File Upload Service (WS)
 */
function MicroServiceInterface(path, id, hashCode){
    this.getBasicCredentials(id, hashCode);
    this.path = path;
}


function make_base_auth(user, password) {
    var tok = user + ':' + password;
    var hash = window.btoa(unescape(encodeURIComponent(tok)));
    return "Basic " + hash;
}

FileUploadServiceFacade.prototype.getBasicCredentials = function(id, hashCode) {
    var username = this.username;
    var password = this.password;
    $.ajax({
        url: "/rest/basic-auth/upload-service-token",
        data: "id="+id+"&hashCode="+hashCode,
        type: "GET",
        async: false
    }).done(function(credentials) {
        console.log("CREDENTIALS = ");
        console.log(credentials);
        username = credentials.username;
        password = credentials.password;
    });
    this.username = username;
    this.password = password;
};

FileUploadServiceFacade.prototype.ajaxRequest = function(path, method) {
    var username = this.username;
    var password = this.password;
    var promise = $.ajax({
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", make_base_auth(username, password));
            xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
            xhr.setRequestHeader("X-Ajax-Call", true);
        },
        url: path,
        type: method,
        dataType: "json",
        crossDomain: true
    });
    return promise;
};
