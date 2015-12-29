/*!
 * speedt
 * Copyright(c) 2015 speedt <13837186852@qq.com>
 * BSD 3 Licensed
 */
'use strict';

module.exports = {
	FILEPATH: {
		CRON: '/config/cron.json',
		LOG: '/config/log4js.json',
		SERVER: '/config/server.json'
	}, KEYWORDS: {
		BEFORE_FILTER: '__befores__',
		AFTER_FILTER: '__afters__'
	}, RESERVED: {
		BASE: 'base',
		MAIN: 'main',
		ALL: 'all',
		CPU: 'cpu',
		ENV: 'env',
		ENV_DEV: 'development',
		ENV_PRO: 'production',
		SERVER_TYPE: 'serverType',
		SERVER_ID: 'serverId',
		SERVER: 'server',
		CLIENT: 'client'
	}
};