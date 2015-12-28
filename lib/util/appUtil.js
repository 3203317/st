/*!
 * speedt
 * Copyright(c) 2015 speedt <13837186852@qq.com>
 * BSD 3 Licensed
 */
'use strict';

var utils = require('speedt-utils'),
	path = require('path'),
	async = require('async'),
	fs = require('fs');

var Constants = require('./constants');

var exports = module.exports;

exports.defaultConfiguration = function(app){
	var args = parseArgs(process.argv);
	// TODO
	setupEnv(app, args);
};

exports.optComponents = function(comps, method, cb){
};

exports.loadDefaultComponents = function(app){
	// TODO
};

var setupEnv = function(app, args){
	// TODO
};

var processArgs = function(app, args){
	// TODO
};

var parseArgs = function(argv){
	var pos = 1;
	var argsMap = { main: argv[pos] };
	// TODO
	for(var i = ++pos; i < argv.length; i++){
		var arg = argv[i];
		var sep = arg.indexOf('=');
		if(-1 === sep) continue;
		// TODO
		var key = arg.slice(0, sep);
		if(!key) continue;
		// TODO
		var val = arg.slice(++sep);
		if(!val) continue;
		// TODO
		if(!isNaN(Number(val)) && 0 > (val.indexOf('.'))){
			val = Number(val);
		} // END
		argsMap[key] = val;
	} // END
	return argsMap;
};