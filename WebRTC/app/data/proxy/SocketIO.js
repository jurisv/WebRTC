Ext.define ('WebRTC.data.proxy.SocketIO', {
    extend: 'Ext.data.proxy.Server' ,
    alias: 'proxy.socketio' ,

    // Keep a default copy of the action methods here. Ideally could just null
    // out actionMethods and just check if it exists & has a property, otherwise
    // fallback to the default. But at the moment it's defined as a public property,
    // so we need to be able to maintain the ability to modify/access it.
    defaultActionMethods: {
        create : 'POST',
        read   : 'GET',
        update : 'POST',
        destroy: 'POST'
    },

    config: {
        /**
         * @cfg {Boolean} binary
         * True to request binary data from the server.  This feature requires
         * the use of a binary reader such as {@link Ext.data.amf.Reader AMF Reader}
         */
        binary: false,

        /**
         * @cfg {Object} [headers]
         * Any headers to add to the Ajax request.
         *
         * example:
         *
         *     proxy: {
         *         headers: {'Content-Type': "text/plain" }
         *         ...
         *     }
         */
        headers: undefined,

        /**
         * @cfg {Boolean} paramsAsJson `true` to have any request parameters sent as {@link Ext.data.Connection#method-request jsonData}
         * where they can be parsed from the raw request. By default, parameters are sent via the
         * {@link Ext.data.Connection#method-request params} property. **Note**: This setting does not apply when the
         * request is sent as a 'GET' request. See {@link #actionMethods} for controlling the HTTP verb
         * that is used when sending requests.
         */
        paramsAsJson: false,

        /**
         * @cfg {Boolean} withCredentials
         * This configuration is sometimes necessary when using cross-origin resource sharing.
         * @accessor
         */
        withCredentials: false,

        /**
         * @cfg {Boolean} useDefaultXhrHeader
         * Set this to false to not send the default Xhr header (X-Requested-With) with every request.
         * This should be set to false when making CORS (cross-domain) requests.
         * @accessor
         */
        useDefaultXhrHeader: true,

        /**
         * @cfg {String} username
         * Most oData feeds require basic HTTP authentication. This configuration allows
         * you to specify the username.
         * @accessor
         */
        username: null,

        /**
         * @cfg {String} password
         * Most oData feeds require basic HTTP authentication. This configuration allows
         * you to specify the password.
         * @accessor
         */
        password: null,

        /**
         * @cfg {Object} actionMethods
         * Mapping of action name to HTTP request method. In the basic AjaxProxy these are set to 'GET' for 'read' actions
         * and 'POST' for 'create', 'update' and 'destroy' actions. The {@link Ext.data.proxy.Rest} maps these to the
         * correct RESTful methods.
         */
        actionMethods: {
            create : 'POST',
            read   : 'GET',
            update : 'POST',
            destroy: 'POST'
        }
    },

    doRequest: function(operation) {
        var me = this,
            writer  = me.getWriter(),
            request = me.buildRequest(operation),
            method  = me.getMethod(request),
            jsonData, params;

        if (writer && operation.allowWrite()) {
            request = writer.write(request);
        }

        request.setConfig({
            binary              : me.getBinary(),
            headers             : me.getHeaders(),
            timeout             : me.getTimeout(),
            scope               : me,
            callback            : me.createRequestCallback(request, operation),
            method              : method,
            useDefaultXhrHeader : me.getUseDefaultXhrHeader(),
            disableCaching      : false // explicitly set it to false, ServerProxy handles caching
        });

        if (method.toUpperCase() !== 'GET' && me.getParamsAsJson()) {
            params = request.getParams();

            if (params) {
                jsonData = request.getJsonData();
                if (jsonData) {
                    jsonData = Ext.Object.merge({}, jsonData, params);
                } else {
                    jsonData = params;
                }
                request.setJsonData(jsonData);
                request.setParams(undefined);
            }
        }

        if (me.getWithCredentials()) {
            request.setWithCredentials(true);
            request.setUsername(me.getUsername());
            request.setPassword(me.getPassword());
        }
        return me.sendRequest(request);
    },

    /**
     * Fires a request
     * @param {Ext.data.Request} The request
     * @return {Ext.data.Request} The request
     * @private
     */
    sendRequest: function(request) {
        var me = this,
            config = request.config,
            data ={
                params: config.params,
                records: request._jsonData
            };
        //make sure we're connected
        if(!this.socket){
            //this is a namespaced socket
            me.socket = io.connect(me.url);
            me.setupSocketPush();
        }

        me.socket.emit(config.action, data, config.callback);

        this.lastRequest = request;

        return request;
    },

    /**
     * Aborts a running request.
     * @param {Ext.data.Request} [request] The request to abort. If not passed, the most recent active
     * request will be aborted.
     */
    abort: function(request) {
        request = request || this.lastRequest;
        if (request) {
            Ext.Ajax.abort(request.getRawRequest());
        }
    },

    /**
     * Returns the HTTP method name for a given request. By default this returns based on a lookup on
     * {@link #actionMethods}.
     * @param {Ext.data.Request} request The request object
     * @return {String} The HTTP method to use (should be one of 'GET', 'POST', 'PUT' or 'DELETE')
     */
    getMethod: function(request) {
        var actions = this.getActionMethods(),
            action = request.getAction(),
            method;

        if (actions) {
            method = actions[action];
        }
        return method || this.defaultActionMethods[action];
    },

    /**
     * @private
     * TODO: This is currently identical to the JsonPProxy version except for the return function's signature. There is a lot
     * of code duplication inside the returned function so we need to find a way to DRY this up.
     * @param {Ext.data.Request} request The Request object
     * @param {Ext.data.operation.Operation} operation The Operation being executed
     * @return {Function} The callback function
     */
    createRequestCallback: function(request, operation) {
        var me = this;

        return function(options, success, response) {
            if (request === me.lastRequest) {
                me.lastRequest = null;
            }
            me.processResponse(success, operation, request, response);
        };
    },

    destroy: function() {
        this.lastRequest = null;
        this.callParent();
    },


    setupSocketPush: function(){
        //use api to to listen
        Ext.Object.each(this.getApi(), function(key, value){
            console.log('adding '+ key +' listener on ' + value);
            me.socket.on (value, function (data) {
                var myKey = key;
                me.doListenApi (myKey, data);
            });
        });
    }


    /*config: {
     url:'',
     api: {
     all: 'all',
     create: 'create' ,
     read: 'read' ,
     update: 'update' ,
     destroy: 'destroy'
     }
     },

     constructor: function(config){
     var me = this;

     me.initConfig (config);
     me.callParent(arguments);

     //this is a namespaced socket that mimics api methods
     me.socket = io.connect(me.url);

     //use api to to listen
     Ext.Object.each(me.__proto__.config.api, function(key, value){
     console.log('adding '+ key +' listener on ' + value);
     me.socket.on (value, function (data) {
     var myKey = key;
     me.doListenApi (myKey, data);
     });
     });

     //use api to to emit
     Ext.Object.each(me.__proto__.config.api, function(key, value){
     console.log('adding '+ key +' emitter on ' + value);
     var myKey = key,
     myValue = value;
     me[value] = function ( operation, callback, scope) {
     var key = myKey,
     value = myValue;
     me.doEmitApi (key, operation, callback, scope, value);
     };
     });

     return me;

     },

    doListenApi: function (key, data){
        console.log('heard key of  '+ key +' data ' + data );

        switch (key){
            case 'read':
                break;
            case 'update':
                break;
            case 'delete':
                break;
            case 'create':
                break;
            case 'all':
                this.fireEvent('roomschanged',data);
                break;
        }

    },

    doEmitApi: function (key, operation, callback, scope, value){
       console.log('emitting key of  '+ key );
       this.socket.emit(key, value);
    }
     */

});

