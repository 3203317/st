/*!
 * speedt
 * Copyright(c) 2015 speedt <13837186852@qq.com>
 * BSD 3 Licensed
 */
'use strict';

var util = require('util'),
    Stream = require('stream'),
    utils = require('speedt-utils');

var ST_HEAD = 1, // wait for head
    ST_BODY = 2, // wait for body
    ST_CLOSED = 3; // closed

var Socket = function(socket, firstData, opts){
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
	self.firstData = firstData;
	self.remoteAddress = socket.remoteAddress;
	self.remotePort = socket.remotePort;

	// TODO
	socket.on('data', onData.bind(self));
	socket.on('error', onError.bind(self));
	// TODO
	socket.on('timeout', onTimeout.bind(self));
	socket.once('close', onClose.bind(self));

	// TODO
	self.state = ST_HEAD;
};

util.inherits(Socket, Stream);
module.exports = Socket;
var proto = Socket.prototype;

proto.send = function(encode, msg, cb){
	var self = this;
	// TODO
};

proto.close = function(){
	var self = this;
	try{
		if(self.socket) self.socket.destroy();
	}catch(e){
		console.error('[%s] socket close with destroy error: %j'.red, utils.format(), e.stack);
	}
};

proto.handshake = function(){
	var self = this;
	console.log('handshake');
	console.log(self.firstData);
};

var onData = function(chunk){
	var self = this;
	// TODO
	if(self.state === ST_CLOSED) throw new Error('socket has closed');
	// TODO
	console.log('onData');
	console.log(arguments);
};

var onError = function(err){
	var self = this;
	// TODO
	console.error('[%s] the remote %s:%s is %s'.red, utils.format(), self.remoteAddress, self.remotePort, err.toString().toLowerCase());
	self.close();
};

var onTimeout = function(){
	var self = this;
	// TODO
	console.warn('[%s] socket is timeout, the remote %s:%s'.yellow, utils.format(), self.remoteAddress, self.remotePort);
	self.close();
};

var onClose = function(){
	var self = this;
	// TODO
	console.info('[%s] socket is closed: %s:%s'.yellow, utils.format(), self.remoteAddress, self.remotePort);
	self.emit('close');
};