/*!
 * speedt
 * Copyright(c) 2015 speedt <13837186852@qq.com>
 * BSD 3 Licensed
 */
'use strict';

var fs = require('fs'),
	path = require('path');

var SpeedT = module.exports = {
	version: require('../package.json').version, // Current version
	filters: {},
	connectors: {},
	components: {}
};

var load = function(path, name){
	if(name) return require(path + name);
	return require(path);
};

Object.defineProperty(SpeedT.connectors, 'hyxconnector', {
	get: load.bind(null, './connectors/hyxconnector')
});

SpeedT.createApp = function(opts, cb){
	var app = require('./application');
	app.init(opts);
	cb.bind(app)();
};

// TODO
fs.readdirSync(__dirname +'/filters/handler').forEach(function (filename){
	if(!/\.js$/.test(filename)) return;
	// TODO
	var name = path.basename(filename, '.js');
	var _load = load.bind(null, './filters/handler/', name);
	Object.defineProperty(SpeedT.filters, name, { get: _load, enumerable: true });
});