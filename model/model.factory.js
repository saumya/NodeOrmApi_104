// Factory
//


const config = require('../app.config');
//
const mysql = require('mysql2');
const Sequelize = require('sequelize');

const Model = Sequelize.Model;

const getPersonModel = require('./person.model');
const getGroupModel = require('./group.model');
//const getPersonGroupModel = require('./personGroup.model');

const getDoctorModel = require('./doctor.model.js');
const getDoctorGroupModel = require('./doctorGroup.model');

const getScheduleModel = require('./schedule.model');



// initialize the proporties
var sequelize = null;
//
var ModelPerson = null;
var ModelGroup = null;
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

	const ModelPerson = getPersonModel(sequelize);
	ModelPerson.sync({force:true}).then(()=>{
      console.log('Sequelize: Synced! ModelPerson');
      //console.log(ModelPerson);
  }).catch(err=>{
      console.log('+--- Sequelize - Error ---------------');
      console.error('Sequelize: Model Error: ModelPerson: ', err);
  });

  // Instead of calling sync() for every model, you can call sequelize.sync() which will automatically sync all models.

  const ModelGroup = getGroupModel(sequelize);
  ModelGroup.sync({force:true}).then(()=>{
  	console.log('Sequelize: Synced! ModelGroup');
  	//console.log(ModelGroup);
  }).catch(err=>{
  	console.log('+--- Sequelize - Error ---------------');
  	console.error('Sequelize: Model Error: ModelGroup: ', err);
  });
  
  /*
  const ModelPersonGroup = getPersonGroupModel(sequelize);
  ModelPersonGroup.sync({force:true}).then(()=>{
  	console.log('Sequelize: Synced! ModelPersonGroup');
  	//console.log(ModelPersonGroup);
  }).catch(err=>{
  	console.log('+--- Sequelize - Error ---------------');
  	console.error('Sequelize: Model Error: ModelPersonGroup: ', err);
  });
  */

  const ModelDoctor = getDoctorModel(sequelize);
	ModelDoctor.sync({force:true}).then(()=>{
      console.log('Sequelize: Synced! ModelDoctor');
      //console.log(ModelDoctor);
  }).catch(err=>{
      console.log('+--- Sequelize - Error ---------------');
      console.error('Sequelize: Model Error: ModelDoctor: ', err);
  });

  const ModelDoctorGroup = getDoctorGroupModel(sequelize);
  ModelDoctorGroup.sync({force:true}).then(()=>{
  	console.log('Sequelize: Synced! ModelDoctorGroup');
  	//console.log(ModelDoctorGroup);
  }).catch(err=>{
  	console.log('+--- Sequelize - Error ---------------');
  	console.error('Sequelize: Model Error: ModelDoctorGroup: ', err);
  });

  const ScheduleModel = getScheduleModel(sequelize);
  ScheduleModel.sync({force:true}).then(()=>{
  	console.log('Sequelize: Synced! ScheduleModel');
  	//console.log(ScheduleModel);
  }).catch(err=>{
  	console.log('+--- Sequelize - Error ---------------');
  	console.error('Sequelize: Model Error: ScheduleModel: ', err);
  });

} // initTheModels/

// ----------- API calls ---------------------------------
const createGroupWithName = function(groupObj,onResult){
	console.log('model.factory : createGroupWithName');
	console.log(groupObj);

	const ModelGroup = getGroupModel(sequelize);
	ModelGroup.create(groupObj).then(function(result){
		console.log('RESULT : ModelGroup.create');
		//console.log( result );
		onResult(result);
	}).catch(function(error){
		console.log('ERROR : ModelGroup.create');
		//console.log( error );
		onResult( error );
	});

}

//TODO: API implementation of the following signatures

/*

createPerson
createDoctor
createDoctorGroup
createSchedule

updatePerson
updateDoctor
updateDoctorGroup
updateSchedule

deletePerson
deleteDoctor
deleteDoctorGroup
deleteSchedule

*/

const createPerson = function(personObj,onResult){
  console.log('model.factory : createPerson');
  console.log(personObj);

  const newPerson = {
    name: personObj.person_name ,
    phone: personObj.person_phone ,
    email: personObj.person_email,
    address: personObj.person_address
  }

  const ModelPerson = getPersonModel(sequelize);
  ModelPerson.create( newPerson ).then(function(result){
    console.log('RESULT : ModelPerson.create');
    //console.log( result );
    onResult(result);
  }).catch(function(error){
    console.log('ERROR : ModelPerson.create');
    //console.log( error );
    onResult( error );
  });
}



// ----------- API calls / ---------------------------------











module.exports = { 
	getSequelize, 
	initModelFactory,
	initTheModels,
	createGroupWithName 
}
//