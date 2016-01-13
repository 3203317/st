/*!
 * speedt
 * Copyright(c) 2015 speedt <13837186852@qq.com>
 * BSD 3 Licensed
 */
'use strict';

var util = require('util'),
	Stream = require('stream'),
	utils = require('speedt-utils');

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
	socket.once('close', self.emit.bind(self, 'close'));
	socket.on('data', onData.bind(self, socket));
};

util.inherits(Socket, Stream);
module.exports = Socket;
var proto = Socket.prototype;

var onData = function(socket, data){
	var self = this;
	self.emit('data', data);
};

proto.close = function(reason){
	if(reason) this.socket.end(reason);
	this.socket.destroy();
};