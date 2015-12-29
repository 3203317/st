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
	var genSocket = function(socket){
		// TODO
		console.log(socket);
	}

	// TODO
	if(self.ssl){
		// TODO
	}else{
		self._server = net.createServer();
	}

	self.switcher = new Switcher(self._server, self.opts);
	// TODO
	self.switcher.on('connection', function (socket){
		genSocket(socket);
	});

	self._server.listen(self.port, self.host);

	// TODO
	process.nextTick(cb);
};

proto.stop = function(force, cb){
	var self = this;
	process.nextTick(cb);
};