/*!
 * speedt
 * Copyright(c) 2015 speedt <3203317@qq.com>
 * BSD 3 Licensed
 */
'use strict';

var utils = require('speedt-utils'),
    colors = require('colors');

var app = require('../../');

process.on('uncaughtException', function (err){
	console.error(err.stack.red);
});

process.on('exit', function (code){
	if(0 === code) return console.warn('[WARN ] [%s] process exit.'.yellow, utils.format());
	// TODO
	console.error('[ERROR] [%s] process exit with code: %s.', utils.format(), code);
});

app.createApp(null, function(){
	var self = this;

	self.configure('production|development', function(){
		// TODO
	});

	self.configure('production|development', 'connector', function(){
		app.set('', {
			connector : app.connectors.hyxconnector,
			heartbeat : 3,
			useDict : true,
			useProtobuf : true
		});
	});

	// TODO
	self.start(function (err){
		if(err) return console.error('[ERROR] [%s] app start error: %j.'.red, utils.format(), err.message);
	});
});