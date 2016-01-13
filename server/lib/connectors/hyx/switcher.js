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

var ST_STARTED = 1,
	ST_CLOSED = 2;

var DEFAULT_TIMEOUT = 3;

var Switcher = function(server, opts){
	var self = this;
	// TODO
	opts = opts || {};
	self.opts = opts;
	EventEmitter.call(self);
	// TODO
	self.server = server;
	self.timeout = 1000 * (opts.timeout || DEFAULT_TIMEOUT);
	self.noDelay = opts.noDelay || false;

	if(opts.ssl){
	}else{
		server.on('connection', newSocket.bind(self));
	}

	server.once('listening', self.emit.bind(self, 'listening'));

	// TODO
	self.state = ST_STARTED;
};

util.inherits(Switcher, EventEmitter);
module.exports = Switcher;
var proto = Switcher.prototype;

proto.listen = function(port, host){
	this.server.listen(port, host);
};

proto.close = function(){
	var self = this;
	// TODO
	if(ST_STARTED !== self.state) return;
	self.state = ST_CLOSED;
};

var newSocket = function(socket){ 
	var self = this;
	if(ST_STARTED !== self.state) return;

	// TODO
	console.info('[%s] new socket, the remote %s:%s'.cyan, utils.format(), socket.remoteAddress, socket.remotePort);

	// TODO
	socket.setTimeout(1000 * DEFAULT_TIMEOUT);
	socket.once('timeout', onTimeout.bind(self, socket));
	socket.once('error', onError.bind(self, socket));
	socket.once('data', onData.bind(self, socket));
};

var onData = function(socket, data){
	var self = this;
	// TODO
	socket.setTimeout(self.timeout);
	socket.setNoDelay(self.noDelay);
	// TODO
	var tcpSocket = new TcpSocket(socket, {});
	self.emit('connection', tcpSocket);
	socket.emit('data', data);
};

var onTimeout = function(socket){
	console.warn('[%s] socket is timeout, the remote %s:%s'.yellow, utils.format(), socket.remoteAddress, socket.remotePort);
	socket.end('timeout');
	socket.destroy();
};

var onError = function(socket, err){
	var peername = socket._peername;
	console.error('[%s] socket %s:%s is error: %j'.red, utils.format(), peername.address, peername.port, err);
	// TODO
	try{
		socket.end('error');
	}catch(e){
		console.error('[%s] socket %s:%s close with destroy error: %j'.red, utils.format(), peername.address, peername.port, e.toString());
	}
	socket.destroy();
};