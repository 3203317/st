/*!
 * speedt
 * Copyright(c) 2015 speedt <13837186852@qq.com>
 * BSD 3 Licensed
 */
'use strict';

var utils = require('speedt-utils');

module.exports = function(app, opts){
	return new Component(app, opts);
};

var Component = function(app, opts){
	var self = this;
	opts = opts || {};
};

var proto = Component.prototype;
proto.name = '__connector__';

proto.start = function(cb){
	var self = this;
	process.nextTick(cb);
};

proto.stop = function(force, cb){
	var self = this;
	process.nextTick(cb);
};