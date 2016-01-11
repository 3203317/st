/*!
 * speedt
 * Copyright(c) 2015 speedt <13837186852@qq.com>
 * BSD 3 Licensed
 */
'use strict';

var utils = require('speedt-utils');

var Component = function(app, opts){
	var self = this;
	opts = opts || {};
	self.opts = opts;
	// TODO
	self.app = app;
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
	connector.on('connection', onConnection.bind(self));
	connector.start(cb);
};

proto.stop = function(force, cb){
	var connector = this.connector;
	// TODO
	if(!connector) return process.nextTick(cb);
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
	var curServer = this.app.getCurServer();
	console.info('[%s] server is listening on %s:%s'.magenta, utils.format(), curServer.host, curServer.port);
};

var onConnection = function(socket){
	var self = this;
	// TODO
};

var onError = function(socket, err){
	console.error('[%s] the remote %s:%s is error: %j'.red, utils.format(), socket.remoteAddress, socket.remotePort, err);
	socket.destroy();
};

/**
 * socket last method
 */
var onClose = function(socket){
	var self = this;
	// TODO
	self.connection.decreaseConnectionCount(socket.id);
	console.log('socket last method');
};

var onTimeout = function(socket){
	console.warn('[%s] socket is timeout, the remote %s:%s'.yellow, utils.format(), socket.remoteAddress, socket.remotePort);
	socket.destroy();
};

/**
 * host filter
 */
var hostFilter = function(host, cb){
	var self = this;
	var blacklistFilter = self.opts.blacklistFilter;
	// TODO
	if(!!blacklistFilter && ('function' === typeof blacklistFilter)){
		return blacklistFilter(host, function (result){
			if(!result) console.warn('[%s] remote host %s is deny'.yellow, utils.format(), host);
			cb(result);
		}); // END
	} // END
	cb(true);
};

var securityCheck = function(){
	var self = this;
	var connection = self.connection;
	var connCount = connection.increaseConnectionCount();
	// TODO
	if(connCount > connection.maxConnections){
		console.warn('[%s] server %s has reached the max connections is %s'.yellow, utils.format(), self.app.getServerId(), connection.maxConnections);
		return false;
	} // END
	return true;
};