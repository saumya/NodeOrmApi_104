// Factory
//


const config = require('../app.config');
//
const mysql = require('mysql2');
const Sequelize = require('sequelize');

const Model = Sequelize.Model;

const getPersonModel = require('./person.model');



// initialize the proporties
var sequelize = null;
//
var ModelPerson = null;
//

const getSequelize = () => { return sequelize }
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
		console.log('YES : Sequelize: Connection has been established successfully.');
		onSuccess(sequelize);
	}).catch(function(error){
		console.log('+--- Sequelize - Error ---------------');
		console.error('NO : Sequelize: Unable to connect to the database:', error);
		onFail(error);
	});
}

// ---------------------------------------------------------------------------------------
// Initialises the Models and saves them.
// The ORM creates the tables and if it is already present, deletes them and re-creates
// ---------------------------------------------------------------------------------------
const initTheModels = function(){
	console.log( 'initTheModels' );

	ModelPerson = getPersonModel(sequelize);
	ModelPerson.sync({force:true}).then(()=>{
      console.log('Sequelize: Synced! ModelPerson');
      console.log(ModelPerson);
  }).catch(err=>{
      console.log('+--- Sequelize - Error ---------------');
      console.error('Sequelize: Model Error: ModelPerson: ', err);
  });

  // Instead of calling sync() for every model, you can call sequelize.sync() which will automatically sync all models.
  

}











module.exports = { 
	getSequelize, 
	initModelFactory,
	initTheModels 
}
//