/*!
 * speedt
 * Copyright(c) 2015 speedt <13837186852@qq.com>
 * BSD 3 Licensed
 */
'use strict';

var util = require('util'),
    EventEmitter = require('events').EventEmitter,
    net = require('net'),
    tls = require('tls'),
    utils = require('speedt-utils');

var Switcher = require('./hyx/switcher');

var Connector = function(port, host, opts){
	var self = this;
	// TODO
	if(!(self instanceof Connector)){
		return new Connector(port, host, opts);
	}
	// TODO
	EventEmitter.call(self);
	// TODO
	self.opts = opts || {};
	self.port = port;
	self.host = host;
	self.ssl = opts.ssl;
	self.curId = 1;
};

util.inherits(Connector, EventEmitter);
module.exports = Connector;
var proto = Connector.prototype;

proto.start = function(cb){
	var self = this;
	// TODO
	var server = null;
	if(self.ssl){
		server = tls.createServer(self.ssl);
	}else{
		server = net.createServer();
	}
	// TODO
	self.switcher = new Switcher(server, self.opts);
	self.switcher.on('listening', self.emit.bind(self, 'listening'));
	self.switcher.on('close', self.emit.bind(self, 'close'));
	self.switcher.on('error', self.emit.bind(self, 'error'));
	// TODO
	self.switcher.on('connection', function (socket){
		console.log('socket');
	});

	self.switcher.listen(self.port, self.host);
	// TODO
	process.nextTick(cb);
};

proto.stop = function(force, cb){
	var self = this;
	if(!self.switcher) return process.nextTick(cb);
	// TODO
	self.switcher.close();
	self.switcher = null;
};