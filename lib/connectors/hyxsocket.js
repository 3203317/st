/*!
 * speedt
 * Copyright(c) 2015 speedt <13837186852@qq.com>
 * BSD 3 Licensed
 */
'use strict';

var util = require('util'),
    EventEmitter = require('events').EventEmitter,
    utils = require('speedt-utils');

var Socket = function(id, socket){
	var self = this;
	EventEmitter.call(self);
	// TODO
	self.id = id;
	self.socket = socket;
	// TODO
	self.remoteAddress = socket.remoteAddress;
	self.remotePort = socket.remotePort;
	// TODO
	socket.once('timeout', self.emit.bind(self, 'timeout'));
	socket.once('close', self.emit.bind(self, 'close'));
};

util.inherits(Socket, EventEmitter);
module.exports = Socket;
var proto = Socket.prototype;

proto.setNoDelay = function(noDelay){
	this.socket.setNoDelay(noDelay);
};

proto.setTimeout = function(timeout){
	this.socket.setTimeout(timeout);
};

proto.destroy = function(reason){
	this.socket.destroy(reason);
};