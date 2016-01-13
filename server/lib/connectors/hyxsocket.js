/*!
 * speedt
 * Copyright(c) 2015 speedt <13837186852@qq.com>
 * BSD 3 Licensed
 */
'use strict';

var util = require('util'),
	EventEmitter = require('events').EventEmitter,
	utils = require('speedt-utils');

var ST_INITED = 1,
	ST_WAIT_ACK = 2,
	ST_WORKING = 3,
	ST_CLOSE = 4;

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
	socket.once('close', self.emit.bind(self, 'disconnect'));
	socket.on('data', onMessage.bind(self, socket));
	// TODO
	self.state = ST_INITED;
};

util.inherits(Socket, EventEmitter);
module.exports = Socket;
var proto = Socket.prototype;

var onMessage = function(socket, data){
	var self = this;
	self.emit('message', data)
};

proto.disconnect = function(reason){
	var self = this;
	// TODO
	if(ST_CLOSE === self.state) return;
	self.state = ST_CLOSE;
	self.socket.close(reason);
};