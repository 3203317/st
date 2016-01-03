/*!
 * speedt
 * Copyright(c) 2015 speedt <13837186852@qq.com>
 * BSD 3 Licensed
 */
'use strict';

var util = require('util'),
    EventEmitter = require('events').EventEmitter,
    utils = require('speedt-utils');

var ST_INITED = 0,
    ST_WAIT_ACK = 1,
    ST_WORKING = 2,
    ST_CLOSED = 3;

var Socket = function(id, socket){
	var self = this;
	EventEmitter.call(self);

	// TODO
	self.id = id;
	self.socket = socket;

	// TODO
	self.remoteAddress = { ip: socket.remoteAddress, port: socket.remotePort };

	console.log(self.remoteAddress)

	// TODO
	self.state = ST_INITED;
};

util.inherits(Socket, EventEmitter);
module.exports = Socket;
var proto = Socket.prototype;

proto.disconnect = function(){
	var self = this;
	if(self.state === ST_CLOSED) return;
	// TODO
	self.state = ST_CLOSED;
	self.socket.emit('close');
	self.socket.close();
};

proto.handshake = function(){
	var self = this;
	// TODO
	console.log('handshake')
};