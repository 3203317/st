/*!
 * speedt
 * Copyright(c) 2015 speedt <3203317@qq.com>
 * BSD 3 Licensed
 */
'use strict';

var fs = require('fs'),
	path = require('path');

var application = require('./application');

var SpeedT = module.exports = {
	version: require('../package.json').version, // Current version
	components: {}
};

var self = this;

SpeedT.createApp = function(opts, cb){
	var app = application;
	app.init(opts);
	self.app = app;
	cb.bind(app)();
};