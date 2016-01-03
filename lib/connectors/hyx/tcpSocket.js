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
	socket.on('data', onData.bind(self));
	socket.on('end', onEnd.bind(self));

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
		console.error('[%s] socket close with destroy error: %j.'.red, utils.format(), e.stack);
	}
};

var onData = function(chunk){
	var self = this;
	// TODO
	if(self.state === ST_CLOSED) throw new Error('socket has closed');
};

var onEnd = function(chunk){
	var self = this;
	if(chunk) self.socket.write(chunk);
	// TODO
	self.state = ST_CLOSED;
};