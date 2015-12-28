/*!
 * speedt
 * Copyright(c) 2015 speedt <13837186852@qq.com>
 * BSD 3 Licensed
 */
'use strict';

var utils = require('speedt-utils');

var DEFAULT_TIMEOUT = 3000,
    DEFAULT_SIZE = 500;

module.exports = function(timeout, maxSize){
	return new Filter(timeout || DEFAULT_TIMEOUT, maxSize || DEFAULT_SIZE);
};

var Filter = function(timeout, maxSize){
	var self = this;
	self.timeout = timeout;
	self.maxSize = maxSize;
	self.timeouts = {};
};

var proto = Filter.prototype;

proto.before = function(msg, session, next){
	next();
};

proto.after = function(err, msg, session, res, next){
	next(err);
};