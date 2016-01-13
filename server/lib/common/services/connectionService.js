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
	var result = [--self.connCount];
	// TODO
	if(uid) result.push(removeLoginedUser.call(self, uid));
	return result;
};

proto.replaceLoginedUser = function(uid, info){
	var self = this;
	// TODO
	var user = self.logined[uid];
	if(user) return updateUserInfo.call(self, user, info);
	// TODO
	self.loginedCount++;
	// TODO
	info.uid = uid;
	self.logined[uid] = info;
};

var updateUserInfo = function(user, info){
	var self = this;
	// TODO
	for(var p in info){
		if(info.hasOwnProperty(p) && typeof 'function' !== info[p]){
			self.logined[user.uid][p] = info[p];
		} // END
	} // END
};

var removeLoginedUser = function(uid){
	var self = this;
	// TODO
	if(!self.logined[uid]) return;
	// TODO
	delete self.logined[uid];
	// TODO
	return --self.loginedCount;
};

proto.getStatisticsInfo = function(){
	var self = this;
	return {
		serverId: self.serverId,
		connCount: self.connCount,
		loginedCount: self.loginedCount,
		logined: self.logined
	};
};