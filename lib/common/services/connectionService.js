/*!
 * speedt
 * Copyright(c) 2015 speedt <13837186852@qq.com>
 * BSD 3 Licensed
 */
'use strict';

var utils = require('speedt-utils');

var Service = function(app){
	var self = this;
	// TODO
	self.serverId = app.getServerId();
	self.connCount = 0;
};

module.exports = Service;

var proto = Service.prototype;

proto.increaseConnectionCount = function(){
	this.connCount++;
};

proto.addLoginedUser = function(uid, info){

};

proto.getStatisticsInfo = function(){
	var self = this;
	return {
		serverId: self.serverId,
		totalConnCount: self.connCount
	};
};