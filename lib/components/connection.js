/*!
 * speedt
 * Copyright(c) 2015 speedt <13837186852@qq.com>
 * BSD 3 Licensed
 */
'use strict';

var utils = require('speedt-utils');

var ConnectionService = require('../common/services/connectionService');

var Component = function(app, opts){
	var self = this;
	opts = opts || {};
	self.opts = opts;
	// TODO
	self.app = app;
	self.maxConnections = opts.maxConnections || 0;
	self.service = new ConnectionService(app);

	// TODO
	var getFun = function(m){
		return (function(){
			return function(){
				return self.service[m].apply(self.service, arguments);
			};
		})();
	};

	// TODO
	for(var m in self.service){
		var method = self.service[m];
		if('function' === typeof method){
			self[m] = getFun(m);
		}
	}
};

module.exports = function(app, opts){
	return new Component(app, opts);
};

var proto = Component.prototype;
proto.name = '__connection__';