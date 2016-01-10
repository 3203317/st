/*!
 * speedt
 * Copyright(c) 2015 speedt <13837186852@qq.com>
 * BSD 3 Licensed
 */
'use strict';

var util = require('util'),
	EventEmitter = require('events').EventEmitter,
	utils = require('speedt-utils');

var TcpSocket = require('./tcpSocket');

var Switcher = function(server, opts){
	var self = this;
	// TODO
	opts = opts || {};
	self.opts = opts;
	EventEmitter.call(self);
	// TODO
	self.server = server;

	if(opts.ssl){
	}else{
		server.on('connection', newSocket.bind(self));
	}

	// TODO
	server.once('listening', self.emit.bind(self, 'listening'));
};

util.inherits(Switcher, EventEmitter);
module.exports = Switcher;
var proto = Switcher.prototype;

proto.listen = function(port, host){
	this.server.listen(port, host);
};

var newSocket = function(socket){
	var self = this;
	// TODO
	var tcpSocket = new TcpSocket(socket);
	self.emit('connection', tcpSocket);
};