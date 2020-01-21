// Factory
//


const config = require('../app.config');
//
const mysql = require('mysql2');
const Sequelize = require('sequelize');

const Model = Sequelize.Model;

// initialize the proporties
var sequelize = null;

const initModelFactory = function(onSuccess,onFail){
	sequelize = new Sequelize(config.dbConfig.database, config.dbConfig.user, config.dbConfig.password, {
		host: config.dbConfig.host,
		port: config.dbConfig.port,
		dialect: 'mysql',
		pool: {
			max: 5,
			min: 0,
			acquire: 30000,
			idle: 10000
		}
	});
	sequelize.authenticate().then(function(){
		console.log('+--- Sequelize ---------------');
		console.log('Sequelize: Connection has been established successfully.');
		onSuccess(sequelize);
	}).catch(function(error){
		console.log('+--- Sequelize - Error ---------------');
		console.error('Sequelize: Unable to connect to the database:', error);
		onFail(error);
	});
}













module.exports = { initModelFactory }
//