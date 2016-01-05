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
	connector.on('connection', connection.bind(self));
	connector.once('listening', function (port, host){
		console.info('[%s] server is listening on %s:%s'.magenta, utils.format(), host, port);
	}); // END
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

var connection = function(socket){
	var self = this;
	// TODO
	hostFilter.call(self, socket, function (socket, result){
		if(!result) return socket.disconnect();
		// TODO
		securityCheck.call(self, socket, function (socket, result){
			if(!result) return socket.disconnect();
			// TODO
			bindEvents.call(self, socket);
		});
	});
};

var hostFilter = function(socket, cb){
	var self = this;
	// TODO
	var blacklistFilter = self.opts.blacklistFilter;
	// TODO
	if(!!blacklistFilter && ('function' === typeof blacklistFilter)){
		return blacklistFilter(socket, function (socket, result){
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
		console.warn('[%s] server %j has reached the max connections is %j'.yellow, utils.format(), self.app.getServerId(), connection.maxConnections);
		connection.decreaseConnectionCount();
		return cb(socket, false);
	} // END
	cb(socket, true);
};

var onError = function(uid){
	var self = this;
	var connection = self.connection;
	// TODO
	if(connection) connection.decreaseConnectionCount(uid);
};

var onDisconnect = function(uid){
	var self = this;
	var connection = self.connection;
	// TODO
	if(connection) connection.decreaseConnectionCount(uid);
};

var bindEvents = function(socket){
	socket.handshake();
	var self = this;
	// TODO
	var connection = self.connection;

	socket.on('disconnect', function(){
		console.log('disconnect');
	})
};

var getSession = function(socket){
	var self = this;
	// TODO
	return null;
};