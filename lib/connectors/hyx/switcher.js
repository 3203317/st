/*!
 * speedt
 * Copyright(c) 2015 speedt <13837186852@qq.com>
 * BSD 3 Licensed
 */
'use strict';

var util = require('util'),
    EventEmitter = require('events').EventEmitter,
    net = require('net'),
    utils = require('speedt-utils');

var ST_STARTED = 1,
    ST_CLOSED = 2;

var DEFAULT_TIMEOUT = 90;

var Switcher = function(server, opts){
	var self = this;
	// TODO
	EventEmitter.call(self);
	// TODO
	self.opts = opts || {};
	self.server = server;
	self.timeout = (opts.timeout || DEFAULT_TIMEOUT) * 1000;
	self.setNoDelay = opts.setNoDelay || true;

	if(opts.ssl){
		// TODO
	}else{
		server.on('connection', self.newSocket.bind(self));
	}

	server.on('listening', listening.bind(self));
	server.on('close', close.bind(self));
	server.on('error', error.bind(self));

	// TODO
	self.state = ST_STARTED;
};

util.inherits(Switcher, EventEmitter);
module.exports = Switcher;
var proto = Switcher.prototype;

proto.listen = function(port, host){
	var self = this;
	self.port = port;
	self.host = host;
	self.server.listen(port, host);
};

proto.newSocket = function(socket){
	var self = this;
	if(self.state !== ST_STARTED) return;
	// TODO
	console.log(self);
};

proto.close = function(){
	var self = this;
	if(self.state !== ST_STARTED) return;
	// TODO
	self.server.close();
	self.server = null;
	self.state = ST_CLOSED;
};

var listening = function(){
	var self = this;
	self.emit('listening', self.port, self.host);
};

var close = function(){
	var self = this;
	self.emit('close', self.port, self.host);
};

var error = function(err){
	this.emit('error', err);
};