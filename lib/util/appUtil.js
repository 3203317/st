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
	loadServer(app);
	processArgs(app, args);
};

exports.startByType = function(app, cb){
	utils.invokeCallback(cb);
};

exports.optComponents = function(comps, method, cb){
	async.forEachSeries(comps, function (comp, done){
		if('function' === typeof comp[method]){
			return comp[method](done);
		} // END
		done();
	}, function (err){
		if(err) console.error('[%s] operate component fail, method: %j, err: %j.'.red, utils.format(), method, err);
		// TODO
		utils.invokeCallback(cb, err);
	});
};

exports.loadDefaultComponents = function(app){
	var speedt = require('../speedt');
	app.load(speedt.components.connector, app.get('connectorConfig'));
	app.load(speedt.components.monitor, app.get('monitorConfig'));
};

var setupEnv = function(app, args){
	app.set(Constants.RESERVED.ENV, args.env || process.env.NODE_ENV || Constants.RESERVED.ENV_DEV);
};

var loadServer = function(app){
	app.loadConfigBaseApp(Constants.RESERVED.SERVER, Constants.FILEPATH.SERVER);
};

var processArgs = function(app, args){
	var serverType = args.serverType || app.getServerType();
	var serverId = args.id || app.getServerId();
	// TODO
	app.set(Constants.RESERVED.MAIN, args.main);
	app.set(Constants.RESERVED.SERVER_TYPE, serverType);
	app.set(Constants.RESERVED.SERVER_ID, serverId);
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