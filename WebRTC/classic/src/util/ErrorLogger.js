Ext.define("WebRTC.util.ErrorLogger", {
    singleton       : true,
    logUrl          : '//crashlog',
    // Log only one error per page visit
    maxNbrLogs      : 1,
    nbrErrorsLogged : 0,

    constructor : function () {
        window.onerror = Ext.Function.bind(this.onError, this);
    },

    init: function(){

    },

    onError : function (message, file, line, column, errorObj) {
        var win = window,
            d = document;

        if (!message || message.match('chrome://') || message.match('Script error')) {
            return;
        }

        if (this.nbrErrorsLogged < this.maxNbrLogs && message && (line || file)) {
            this.nbrErrorsLogged++;

            var windowWidth = win.innerWidth || d.documentElement.clientWidth || d.body.clientWidth,
                windowHeight = win.innerHeight || d.documentElement.clientHeight || d.body.clientHeight;

            var crashData = {
                msg          : message,
                url          : file,
                line         : line,
                href         : win.location.href,
                windowWidth  : windowWidth,
                windowHeight : windowHeight,
                extVersion   : Ext.versions && Ext.versions.extjs && Ext.versions.extjs.version,
                localDate    : new Date().toString(),

                browser : (Ext.ieVersion && "IE" + Ext.ieVersion) ||
                (Ext.chromeVersion && "Chrome" + Ext.chromeVersion) ||
                (Ext.firefoxVersion && "FF" + Ext.firefoxVersion) ||
                (Ext.safariVersion && "Safari" + Ext.safariVersion) ||
                (Ext.operaVersion && "Opera" + Ext.operaVersion) ||
                navigator.userAgent,

                column : column || '',
                stack  : (errorObj && errorObj.stack) || ''
            };

            var crashString = '';

            Ext.Object.each(crashData, function (key, value) {
                crashString += (key + '=' + encodeURIComponent(value) + '&');
            });

            new Image().src = this.logUrl + '?' + crashString;
        }
    }
});