//
//
// Application configuration

const config = {
	appConfig: {
		'version' : '1.0.0'
	},
	
	// ---------------------------------
	// remote DB
	// ---------------------------------
	// Change 'dbserver.com' to the remote Database server

	dbConfig:{
		host: 'dbserver.com',
		port: '3306',
		user: 'me',
		password: 'pw',
		database: 'dbName'
	}
	
	// ---------------------------------
	// local DB | localhost
	// ---------------------------------
	/*
	dbConfig:{
		host: 'localhost',
		port: '8889',
		user: 'app_user',
		password: 'app_pw',
		database: 'node_app_scheduler'
	}
	*/
}

module.exports = config;
