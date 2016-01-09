/*!
 * speedt
 * Copyright(c) 2015 speedt <13837186852@qq.com>
 * BSD 3 Licensed
 */
'use strict';

var utils = require('speedt-utils');

var ST_STARTED = 1,
    ST_CLOSED = 2;

var DEFAULT_TIMEOUT = 3;

var Component = function(app, opts){
	var self = this;
	opts = opts || {};
	self.opts = opts;
	// TODO
	self.app = app;
	self.timeout = (opts.timeout || DEFAULT_TIMEOUT) * 1000;
	self.setNoDelay = opts.setNoDelay || false;
	self.connector = getConnector(app, opts);
};

module.exports = function(app, opts){
	return new Component(app, opts);
};

var proto = Component.prototype;
proto.name = '__connector__';

proto.start = function(cb){
	var self = this;
	// TODO
	self.connection = self.app.components.__connection__;
	self.session = self.app.components.__session__;
	// TODO
	process.nextTick(cb);
};

proto.afterStart = function(cb){
	var self = this;
	var connector = self.connector;
	// TODO
	connector.once('listening', onListening.bind(self));
	connector.start(cb);
};

proto.stop = function(force, cb){
	var self = this;
	var connector = self.connector;
	if(!connector) return process.nextTick(cb);
	// TODO
	connector.stop(force, cb);
	connector = null;
};

var getConnector = function(app, opts){
	var connector = opts.connector;
	if(!connector) return getDefaultConnector(app, opts);
	// TODO
	if('function' !== typeof connector) return connector;
	// TODO
	var curServer = app.getCurServer();
	return connector(curServer.port, curServer.host, opts);
};

var getDefaultConnector = function(app, opts){
	return;
};

var onListening = function(){
	var self = this;
	// TODO
	var curServer = self.app.getCurServer();
	console.info('[%s] server is listening on %s:%s'.magenta, utils.format(), curServer.host, curServer.port);
	connector.on('connection', onConnection.bind(self));
};

var onConnection = function(socket){
	var self = this;
	// TODO
	socket.once('timeout', onTimeout.bind(self, socket));
	socket.once('close', onClose.bind(self, socket));
	socket.once('error', onError.bind(self, socket));

	hostFilter.call(self, socket, function (socket, result){
		if(!result) return socket.destroy();
		// TODO
		securityCheck.call(self, socket, function (socket, result){
			if(!result) return socket.destroy();
			// TODO
			socket.on('message', onMessage.bind(self, socket);
		});
	}); // END

	socket.setNoDelay(self.setNoDelay);
	socket.setTimeout(self.timeout);
};

var onMessage = function(socket){
	var self = this;
};

var onError = function(socket){
	console.error('[%s] the remote %s:%s is %s'.red, utils.format(), socket.remoteAddress, socket.remotePort, err.toString());
	socket.destroy();
};

/**
 * socket last method
 */
var onClose = function(socket){
	var self = this;
	console.log('socket last method');
};

var onTimeout = function(socket){
	console.warn('[%s] socket is timeout, the remote %s:%s'.yellow, utils.format(), socket.remoteAddress, socket.remotePort);
	socket.destroy();
};

var hostFilter = function(socket, cb){
	var self = this;
	// TODO
	var blacklistFilter = self.opts.blacklistFilter;
	// TODO
	if(!!blacklistFilter && ('function' === typeof blacklistFilter)){
		return blacklistFilter(socket, function (socket, result){
			if(!result) console.warn('[%s] remote %s is deny'.yellow, utils.format(), socket.remoteAddress);
			cb(socket, result);
		}); // END
	} // END
	cb(socket, true);
};

var securityCheck = function(socket, cb){
	var self = this;
	// TODO
	var connection = self.connection;
	var connCount = connection.increaseConnectionCount();
	// TODO
	if(connCount > connection.maxConnections){
		console.warn('[%s] server %s has reached the max connections is %s'.yellow, utils.format(), self.app.getServerId(), connection.maxConnections);
		connection.decreaseConnectionCount();
		return cb(socket, false);
	} // END
	cb(socket, true);
};