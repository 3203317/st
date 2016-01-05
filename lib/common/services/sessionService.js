/*!
 * speedt
 * Copyright(c) 2015 speedt <13837186852@qq.com>
 * BSD 3 Licensed
 */
'use strict';

var utils = require('speedt-utils');

var Service = function(opts){
	var self = this;
	// TODO
	opts = opts || {};
	self.opts = opts;
	self.sessions = {};
	self.uids = {};
};

module.exports = Service;
var proto = Service.prototype;

proto.bind = function(){
	// TODO
};

proto.unbind = function(uid){
	// TODO
};

proto.kick = function(uid, reason, cb){
	var self = this;
	// TODO
};

proto.get = function(sid){
	return this.sessions[sid];
};