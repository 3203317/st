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

var Switcher = require('./hyx/switcher'),
    HyxSocket = require('./hyxsocket');

var Connector = function(port, host, opts){
	var self = this;
	// TODO
	if(!(self instanceof Connector)){
		return new Connector(port, host, opts);
	}
	// TODO
	opts = opts || {};
	self.opts = opts;
	EventEmitter.call(self);
	// TODO
	self.port = port;
	self.host = host;
	self.curId = 1;
};

util.inherits(Connector, EventEmitter);
module.exports = Connector;
var proto = Connector.prototype;

proto.start = function(cb){
	var self = this;
	// TODO
	var server = (self.opts.ssl) ? tls.createServer(self.opts.ssl) : net.createServer();
	// TODO
	self.switcher = new Switcher(server, self.opts);
	var switcher = self.switcher;
	// TODO
	switcher.once('listening', self.emit.bind(self, 'listening'));
	switcher.on('connection', genSocket.bind(self));

	switcher.listen(self.port, self.host);
	// TODO
	process.nextTick(cb);
};

proto.stop = function(force, cb){
	this.switcher.close();
	process.nextTick(cb);
};

var genSocket = function(socket){
	var self = this;
	// TODO
	var hyxsocket = new HyxSocket(++self.curId, socket);
	self.emit('connection', hyxsocket);
};