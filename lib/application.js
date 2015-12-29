/*!
 * speedt
 * Copyright(c) 2015 speedt <13837186852@qq.com>
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
	// TODO
	self.startTime = Date.now();

	// TODO
	opts = opts || {};
	self.settings = {};

	// TODO
	var base = opts.base || path.dirname(require.main.filename);
	self.set(Constants.RESERVED.BASE, base);

	// TODO
	self.components = {};
	self.event = new EventEmitter();

	// TODO
	appUtil.defaultConfiguration(self);

	// TODO
	self.state = STATE_INITED;
	console.info('[INFO ] [%s] app inited: %j.'.green, utils.format(), self.getServerId());
};

Application.start = function(cb){
	var self = this;
	// TODO
	if(self.state > STATE_INITED) return utils.invokeCallback(cb, new Error('app has already start'));

	// TODO
	appUtil.startByType(self, function(){
		appUtil.loadDefaultComponents(self);
		// TODO
		self.state = STATE_START;
		self.afterStart(cb);
	});
};

Application.afterStart = function(cb){
	var self = this;
	// TODO
	if(self.state !== STATE_START) return utils.invokeCallback(cb, new Error('app is not running now'));
	// TODO
};

Application.loadConfigBaseApp = function(key, val){
	var self = this;
	// TODO
	var originPath = path.join(self.getBase(), val);

	if(!fs.existsSync(originPath)){
		console.error('[ERROR] [%s] invalid configuration with file path: %s.'.red, utils.format(), key);
		return;
	}

	// TODO
	var file = require(originPath);
	var env = self.get(Constants.RESERVED.ENV);
	if(file[env]) file = file[env];
	self.set(key, file);
};

Application.configure = function(env, type, cb){
	var len = arguments.length,
		args = new Array(len - 1);

	// TODO
	for(var i=0; i<len; i++) args[i] = arguments[i];

	// TODO
	cb = args.pop();
	env = type = Constants.RESERVED.ALL;

	// TODO
	if(0 < args.length) env = args[0];
	if(1 < args.length) type = args[1];

	// TODO
	var self = this;

	if(env === Constants.RESERVED.ALL || contains(self.settings.env, env)){
		if(type === Constants.RESERVED.ALL || contains(self.settings.serverType, type)){
			cb.call(self);
		} // END
	} // END
	return self;
};

Application.getServerId = function(){
	return this.getCurServer().id;
};

Application.getServerType = function(){
	return this.getCurServer().serverType;
};

Application.getCurServer = function(){
	return this.get(Constants.RESERVED.SERVER);
};

Application.filter = function(filter){
	this.before(filter);
	this.after(filter);
};

Application.set = function(setting, val){
	this.settings[setting] = val;
	return this;
};

Application.get = function(setting){
	return this.settings[setting];
}

Application.getBase = function() {
	return this.get(Constants.RESERVED.BASE);
};

Application.before = function(bf){
	addFilter(this, Constants.KEYWORDS.BEFORE_FILTER, bf);
};

Application.after = function(af){
	addFilter(this, Constants.KEYWORDS.AFTER_FILTER, af);
}

var addFilter = function(app, type, filter){
	var filters = app.get(type);
	if(!filters){
		filters = [];
		app.set(type, filters);
	}
	filters.push(filter);
}

var contains = function(str, settings) {
	if(!settings) return false;
	// TODO
	var ss = settings.split('|');
	for(var i in ss){
		if(str === ss[i]) return true;
	} // END
	return false;
};