/*!
 * speedt
 * Copyright(c) 2015 speedt <13837186852@qq.com>
 * BSD 3 Licensed
 */
'use strict';

var utils = require('speedt-utils');

var Filter = function(){
	// TODO
};

module.exports = function(){
	return new Filter();
};

var proto = Filter.prototype;

proto.before = function(msg, session, next){
	session.__startTime__ = Date.now();
	next();
};

proto.after = function(err, msg, session, res, next){
	var start = session.__startTime__;
	if('number' === typeof start){
		var timeUsed = Date.now() - start;
		var log = {
			route: msg.__route__,
			args: msg,
			time: utils.format(new Date(start)),
			timeUsed: timeUsed
		};
		console.info('[INFO ] [%s] used time: %j.', utils.format(), log);
	}
	next(err);
};