/*!
 * speedt
 * Copyright(c) 2015 speedt <13837186852@qq.com>
 * BSD 3 Licensed
 */
'use strict';

var util = require('util'),
    Stream = require('stream'),
    utils = require('speedt-utils');

var ST_HEAD = 1, // wait for head
    ST_BODY = 2, // wait for body
    ST_CLOSED = 3; // closed

var Socket = function(socket, opts){
	var self = this;
	opts = opts || {};
	self.opts = opts;
	Stream.call(self);
	// TODO
	self.state = ST_HEAD;
};

util.inherits(Socket, Stream);
module.exports = Socket;
var proto = Socket.prototype;

proto.send = function(encode, msg, cb){
	var self = this;
	// TODO
};