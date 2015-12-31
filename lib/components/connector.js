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
	self.connector.on('connection', hostFilter.bind(self, bindEvents));
	self.connector.on('listening', function (port, host){
		console.warn('[%s] server is listening on %s:%s.'.yellow, utils.format(), host, port);
	}); // END
	self.connector.on('close', function(){
		console.warn('[%s] server is closed on %s:%s.'.yellow, utils.format(), host, port);
	}); // END
	self.connector.on('error', function (err){
		console.error('[%s] server is error: %s.'.red, utils.format(), err.message);
	}); // END
	self.connector.start(cb);
};

proto.stop = function(force, cb){
	var self = this;
	if(!self.connector) return process.nextTick(cb);
	// TODO
	self.connector.stop(force, cb);
	self.connector = null;
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

var hostFilter = function(cb, socket){
	console.log('hostFilter');
	var self = this;
	// TODO
	console.log(socket.remoteAddress);
	cb.call(self, socket);
};

var bindEvents = function(socket){
	var self = this;
	// TODO
	var statisticInfo = self.connection.getStatisticsInfo();
	if(!(statisticInfo.totalConnCount < self.connection.opts)){
		// TODO
	}
	console.log('socket')
};