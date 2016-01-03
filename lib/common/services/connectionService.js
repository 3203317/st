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
	self.loginedCount = 0;
	self.logined = {};
};

module.exports = Service;
var proto = Service.prototype;

proto.increaseConnectionCount = function(){
	return ++this.connCount;
};

proto.decreaseConnectionCount = function(uid){
	var self = this;
	// TODO
	var result = [];
	// TODO
	result.push((!self.connCount) ? null : (--self.connCount));
	// TODO
	if(uid) result.push(self.removeLoginedUser(uid));
	return result;
};

proto.addLoginedUser = function(uid, info){
	var self = this;
	if(!self.logined[uid]) self.loginedCount++;
	// TODO
	info.uid = uid;
	self.logined[uid] = info;
};

proto.updateUserInfo = function(uid, info){
	var user = this.logined[uid];
	if(!user) return;

	for(var p in info){
		if(info.hasOwnProperty(p) && typeof 'function' !== info[p]){
			user[p] = info[p];
		}
	}
};

proto.removeLoginedUser = function(uid){
	var self = this;
	// TODO
	delete self.logined[uid];
	if(!!self.logined[uid]) return (--self.loginedCount);
};

proto.getStatisticsInfo = function(){
	var self = this;
	return {
		serverId: self.serverId,
		totalConnCount: self.connCount,
		loginedCount: self.loginedCount,
		logined: logined
	};
};