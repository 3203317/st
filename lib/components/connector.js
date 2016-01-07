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
	connector.once('listening', function (port, host){
		console.info('[%s] server is listening on %s:%s'.magenta, utils.format(), host, port);
	}); // END
	connector.on('connection', onConnection.bind(self));
	connector.on('handshake', function (){
		console.info(arguments);
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

var onConnection = function(ip, cb){
	var self = this;
	// TODO
	hostFilter.call(self, ip, function (result){
		if(!result) return cb(result);
		// TODO
		securityCheck.call(self, cb);
	}); // END
};

var hostFilter = function(ip, cb){
	var self = this;
	// TODO
	var blacklistFilter = self.opts.blacklistFilter;
	// TODO
	if(!!blacklistFilter && ('function' === typeof blacklistFilter)){
		return blacklistFilter(ip, function (result){
			if(!result) console.warn('[%s] remote %s is deny'.yellow, utils.format(), ip);
			cb(result);
		}); // END
	} // END
	cb(true);
};

var securityCheck = function(cb){
	var self = this;
	// TODO
	var connection = self.connection;
	var connCount = connection.increaseConnectionCount();
	// TODO
	if(connCount > connection.maxConnections){
		console.warn('[%s] server %j has reached the max connections is %j'.yellow, utils.format(), self.app.getServerId(), connection.maxConnections);
		connection.decreaseConnectionCount();
		return cb(false);
	} // END
	cb(true);
};