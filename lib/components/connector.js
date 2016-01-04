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
	// TODO
	process.nextTick(cb);
};

proto.afterStart = function(cb){
	var self = this;
	var connector = self.connector;
	// TODO
	connector.on('connection', connection.bind(self));

	// TODO
	connector.on('listening', function (port, host){
		console.info('[%s] server is listening on %s:%s'.magenta, utils.format(), host, port);
	}); // END

	// // TODO
	// connector.on('close', function(){
	// 	console.warn('[%s] server is closed on %s:%s'.yellow, utils.format(), host, port);
	// }); // END

	// // TODO
	// connector.on('error', function (err){
	// 	console.error('[%s] server is error: %j'.red, utils.format(), err.stack);
	// }); // END

	// TODO
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
			if(!result){
				self.connection.decreaseConnectionCount();
				return socket.disconnect();
			} // END
			socket.handshake();
		});
	});
};

var hostFilter = function(socket, cb){
	var self = this;
	// TODO
	var blacklistFilter = self.opts.blacklistFilter;
	// TODO
	if(!!blacklistFilter && ('function' === typeof blacklistFilter)){
		return blacklistFilter(socket.remoteAddress.ip, function (err, result){
			if(err){
				console.error('[%s] connector blacklist error: %j'.red, utils.format(), err.stack);
				return cb(socket, false);
			} // END
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
		console.warn('[%s] server %j has reached the max connections is %j'.yellow, utils.format(), self.app.getCurServer().getServerId(), connection.maxConnections);
		return cb(socket, false);
	} // END
	cb(socket, true);
};