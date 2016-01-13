/*!
 * speedt
 * Copyright(c) 2015 speedt <13837186852@qq.com>
 * BSD 3 Licensed
 */
'use strict';

var utils = require('speedt-utils'),
    colors = require('colors');

var speedt = require('../../');

process.on('uncaughtException', function (err){
	console.error(err);
});

process.on('exit', function (code){
	if(0 === code) return console.warn('[%s] process exit'.yellow, utils.format());
	// TODO
	console.error('[%s] process exit with code: %s'.red, utils.format(), code);
});

speedt.createApp(null, function(){
	var self = this;

	self.configure('production|development', function(){
		this.filter(speedt.filters.time());
		this.filter(speedt.filters.timeout());
	}); // END

	self.configure('production|development', 'connector', function(){
		this.set('connectorConfig', {
			connector: speedt.connectors.hyxconnector,
			heartbeat: 3,
			useDict: true,
			useProtobuf: true,
			noDelay: true,
			blacklistFilter: function(host, cb){
				cb(!0);
			}
		}); // END
	}); // END

	self.configure('production|development', function(){
		this.set('connectionConfig', { maxConnections: 2 });
	}); // END

	// TODO
	self.start(function (err){
		if(err) return console.error('[%s] app start error: %j'.red, utils.format(), err.stack);
	});
});