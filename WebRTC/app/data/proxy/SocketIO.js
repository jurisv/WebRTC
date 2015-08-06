Ext.define ('WebRTC.data.proxy.SocketIO', {
    extend: 'Ext.data.proxy.Server' ,
    alias: 'proxy.socketio' ,

    requires: [
        'WebRTC.data.operation.DestroyPush',
        'WebRTC.data.operation.ReadPush',
        'WebRTC.data.operation.UpdatePush'
    ],

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
         * @cfg {Boolean} paramsAsJson `true` to have any request parameters sent as {@link Ext.data.Connection#method-request jsonData}
         * where they can be parsed from the raw request. By default, parameters are sent via the
         * {@link Ext.data.Connection#method-request params} property. **Note**: This setting does not apply when the
         * request is sent as a 'GET' request. See {@link #actionMethods} for controlling the HTTP verb
         * that is used when sending requests.
         */
        paramsAsJson: false,

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
        },

        withCredentials: false,

        secure: false,

        //if a custom port is required, otherwise use current server port
        port: null,

        connectTimeout: 10000,

        tryMultipleTransports: true,

        reconnect: true,

        reconnectionDelay: 500,

        reconnectionLimit: Infinity,

        maxReconnectionAttempts: Infinity,

        syncDisconnectOnUnload: false,

        autoConnect: true,

        forceNewConnection: false,

        groups: null,

        uuid: null,

        /**
         * @cfg {Object} apiEvents
         * Mapping of events name from socketio to push data from server.
         */
        apiEvents: {
            read   : 'read',
            update : 'update',
            destroy: 'destroy'
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
            scope               : me,
            callback            : me.createRequestCallback(request, operation),
            method              : method
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

        return me.sendRequest(request,operation);
    },

    /**
     * Fires a request
     * @param {Ext.data.Request} The request
     * @return {Ext.data.Request} The request
     * @private
     */
    sendRequest: function(request,operation) {
        var me     = this,
            config = request.config,
            cfg    = me.config,
            data   = {
                params: config.params,
                records: request.getJsonData()
            },
            query = 'params=' + JSON.stringify(config.params);

        //make sure we're connected
        if(!this.socket){
            //this is a namespaced socket
            me.socket = io.connect(me.url,{
                secure: cfg.secure,
                port: cfg.port,
                // query: query,   //test to see if we can send params in the connection
                'connect timeout': cfg.connectTimeout,
                'try multiple transports': cfg.tryMultipleTransports,
                'reconnect': cfg.reconnect,
                'reconnection delay': cfg.reconnectionDelay,
                'reconnection limit': cfg.reconnectionLimit,
                'max reconnection attempts': cfg.maxReconnectionAttempts,
                'sync disconnect on unload': cfg.syncDisconnectOnUnload,
                'auto connect': cfg.autoConnect,
                'force new connection': cfg.forceNewConnection
            });
            me.setupSocketPush(operation);
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


    getPushedDataAsResponse: function (data) {
        return data;
    },

    setupSocketPush: function(op){
        //use api to to listen
        var me = this,
            operationCfg = op.initialConfig,
            apiEvents = me.getApiEvents();

        // READ
        me.socket.on (apiEvents['read'], function (data) {
            var operation = me.createOperation('readpush', Ext.apply(operationCfg, {
                addRecords: true
            }));
            var request = Ext.create('Ext.data.Request',{
                action: 'read',
                operation: operation,
                proxy: me
            });
            var response =  me.getPushedDataAsResponse(data);
            me.processResponse(true, operation, request, response);
        });

        // REMOVE
        me.socket.on (apiEvents['destroy'], function (data) {
            var operation = me.createOperation('destroypush', Ext.apply(operationCfg, {
                internalCallback: operationCfg.internalScope['onProxyWrite']
            }));
            var request = Ext.create('Ext.data.Request',{
                action: 'destroy',
                operation: operation,
                proxy: me
            });
            var response =  me.getPushedDataAsResponse(data);
            me.processResponse(true, operation, request, response);   

        });

        //UPDATE
        me.socket.on (apiEvents['update'], function (data) {
            var operation = me.createOperation('updatepush', Ext.apply(operationCfg, {
                internalCallback: operationCfg.internalScope['onProxyWrite']
            }));

            var request = Ext.create('Ext.data.Request',{
                action: 'update',
                operation: operation,
                proxy: me
            });
            var response =  me.getPushedDataAsResponse(data);
            me.processResponse(true, operation, request, response);            
        });
    }

});
