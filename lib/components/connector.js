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
	// TODO
	self.connector = getConnector(app, opts);
};

module.exports = function(app, opts){
	return new Component(app, opts);
};

var proto = Component.prototype;
proto.name = '__connector__';

proto.start = function(cb){
	var self = this;
	process.nextTick(cb);
};

proto.afterStart = function(cb){
	var self = this;
	self.connector.start(cb);
	self.connector.on('connection', hostFilter.bind(self, bindEvents));
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

var bindEvents = function(self, socket){
	// TODO
	socket.on('disconnect', function(){
		// TODO
	});

	socket.on('error', function(){
		// TODO
	});

	socket.on('message', function(){
		// TODO
	});
};

var handleMessage = function(self, session, msg){
	// TODO
};

var hostFilter = function(cb, socket){
	var ip = socket.remoteAddress.ip;
	console.log(ip)
};