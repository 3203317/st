/*!
 * speedt
 * Copyright(c) 2015 speedt <3203317@qq.com>
 * BSD 3 Licensed
 */
'use strict';

var path = require('path'),
    fs = require('fs'),
    utils = require('speedt-utils'),
    EventEmitter = require('events').EventEmitter;

var appUtil = require('./util/appUtil'),
    Constants = require('./util/constants');

var Application = module.exports = {};

var STATE_INITED  = 1, // app has inited
    STATE_START   = 2, // app start
    STATE_STARTED = 3, // app has started
    STATE_STOPED  = 4; // app has stoped

Application.init = function(opts){
	var self = this;
	opts = opts || {};
	self.settings = {};
	// TODO
	self.components = [];
	self.event = new EventEmitter();
	// TODO
	appUtil.defaultConfiguration(self);
	self.state = STATE_INITED;
	console.info('[INFO ] [%s] app inited: %j.'.green, utils.format(), self.getServerId());
};

Application.start = function(cb){
	var self = this;
	// TODO
	if(self.state > STATE_INITED) return utils.invokeCallback(cb, new Error('app has already start'));
	// TODO
	self.startTime = Date.now();
	// TODO
	self.state = STATE_START;
	self.afterStart(cb);
};

Application.afterStart = function(cb){
	var self = this;
	// TODO
	if(self.state !== STATE_START) return utils.invokeCallback(cb, new Error('app is not running now'));
	// TODO
};

Application.getServerId = function(){
	return 'server-1';
};

Application.filter = function(filter){
	this.before(filter);
	this.after(filter);
};

(function (Application){

	function addFilter(app, type, filter){
		var filters = app.get(type);
		if(!filters){
			filters = [];
			app.set(type, filters);
		}
		filters.push(filter);
	}

	Application.before = function(bf){
		addFilter(this, Constants.KEYWORDS.BEFORE_FILTER, bf);
	};

	Application.after = function(af){
		addFilter(this, Constants.KEYWORDS.AFTER_FILTER, af);
	}
})(Application);