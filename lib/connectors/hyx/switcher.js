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
	opts = opts || {};
	self.opts = opts;
	EventEmitter.call(self);
	// TODO
	self.server = server;
	self.timeout = (opts.timeout || DEFAULT_TIMEOUT) * 1000;
	self.setNoDelay = opts.setNoDelay || true;

	if(opts.ssl){
		// TODO
	}else{
		server.on('connection', newSocket.bind(self));
	}

	// TODO
	server.on('listening', listening.bind(self));
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
	if(self.state !== ST_STARTED) return;
	// TODO
	self.state = ST_CLOSED;
	self.server.close(function(){
		console.warn('[%s] server is closed'.yellow, utils.format());
	});
};

var listening = function(){
	var self = this;
	var connectionKeys = self.server._connectionKey.split(':');
	self.emit('listening', connectionKeys[2], connectionKeys[1]);
};

var newSocket = function(socket){
	var self = this;
	if(self.state !== ST_STARTED) return;
	// socket.setEncoding('utf-8');
	console.info('[%s] new socket, the remote %s:%s'.cyan, utils.format(), socket.remoteAddress, socket.remotePort);

	socket.setTimeout(1000 * 2);
	// TODO
	socket.on('error', onError.bind(self, socket));
	socket.on('timeout', onTimeout.bind(self, socket));

	// TODO
	socket.once('data', function (data){
		socket.setNoDelay(self.setNoDelay);
		socket.setTimeout(self.timeout);
		// TODO
		var tcpSocket = new TcpSocket(socket, {});
		self.emit('connection', tcpSocket);
		// TODO
		socket.removeListener('error', onError);
		socket.removeListener('timeout', onTimeout);
	});
};

var onError = function(socket, err){
	var remoteAddress = socket._peername;
	// TODO
	console.error('[%s] the remote %s:%s is %s'.red, utils.format(), remoteAddress.address, remoteAddress.port, err.toString().toLowerCase());
	socket.destroy();
};

var onTimeout = function(socket){
	console.warn('[%s] socket is timeout, the remote %s:%s'.yellow, utils.format(), socket.remoteAddress, socket.remotePort);
	socket.destroy();
};