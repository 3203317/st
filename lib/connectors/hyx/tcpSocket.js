/*!
 * speedt
 * Copyright(c) 2015 speedt <13837186852@qq.com>
 * BSD 3 Licensed
 */
'use strict';

var util = require('util'),
	Stream = require('stream'),
	utils = require('speedt-utils');

var DEFAULT_TIMEOUT = 3;

var Socket = function(socket, opts){
	var self = this;
	// TODO
	if(!(self instanceof Socket)) {
		return new Socket(socket, opts);
	} // END
	opts = opts || {};
	self.opts = opts;
	Stream.call(self);
	// TODO
	self.socket = socket;
	self.remoteAddress = socket.remoteAddress;
	self.remotePort = socket.remotePort;
	// TODO
	socket.once('error', self.emit.bind(self, 'error'));
	socket.once('timeout', self.emit.bind(self, 'timeout'));
	socket.once('close', self.emit.bind(self, 'close'));
};

util.inherits(Socket, Stream);
module.exports = Socket;
var proto = Socket.prototype;

proto.setNoDelay = function(noDelay){
	noDelay = noDelay || false;
	this.socket.setNoDelay(noDelay);
};

proto.setTimeout = function(timeout){
	timeout = timeout || (1000 * DEFAULT_TIMEOUT);
	this.socket.setTimeout(timeout);
};

proto.destroy = function(){
	this.socket.destroy();
};