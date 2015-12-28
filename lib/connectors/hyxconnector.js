/*!
 * speedt
 * Copyright(c) 2015 speedt <13837186852@qq.com>
 * BSD 3 Licensed
 */
'use strict';

var util = require('util'),
    EventEmitter = require('events').EventEmitter,
    utils = require('speedt-utils');

var Connector = function(server, opts){
	var self = this;
	// TODO
	if(!(self instanceof Connector)){
		return new Connector(server, opts);
	}
	// TODO
	EventEmitter.call(self);
	self.opts = opts || {};
	self.server = server;
};

util.inherits(Connector, EventEmitter);
module.exports = Connector;
var proto = Connector.prototype;

proto.start = function(cb){
	var self = this;
	process.nextTick(cb);
};

proto.stop = function(cb){
	var self = this;
	process.nextTick(cb);
};