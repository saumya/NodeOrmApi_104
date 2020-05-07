// Factory
//
// ref: 
// ref : model : https://sequelize.org/master/manual/model-instances.html
// ref : API : https://sequelize.org/master/class/lib/model.js~Model.html#static-method-destroy
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
		console.log('YES : Sequelize : Connection has been established successfully.');
		onSuccess(sequelize);
	}).catch(function(error){
		console.log('+--- Sequelize - Error ---------------');
		console.error('model.factory.js :  : NO : Sequelize : Unable to connect to the database');

    //console.log(error);
		onFail(error);

    console.error('model.factory.js : / : NO : Sequelize : Unable to connect to the database');
    console.log('+--- Sequelize - Error / ---------------');
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

createPerson x
createDoctor x
createDoctorGroup x
createSchedule x

updatePerson
updateDoctor
updateDoctorGroup
updateSchedule

deletePerson
deleteDoctor
deleteDoctorGroup
deleteSchedule

*/

// create
/*
createPerson 
createDoctor 
createDoctorGroup 
createSchedule 
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

const createDoctor = function(doctorObj,onResult){
  console.log('model.factory : createDoctor');
  console.log(doctorObj);

  const newDoctor = {
    name: doctorObj.doctor_name ,
    phone: doctorObj.doctor_phone ,
    email: doctorObj.doctor_email,
    address: doctorObj.doctor_address
  }

  const ModelDoctor = getDoctorModel(sequelize);
  ModelDoctor.create( newDoctor ).then(function(result){
    console.log('RESULT : ModelDoctor.create');
    //console.log( result );
    onResult(result);
  }).catch(function(error){
    console.log('ERROR : ModelDoctor.create');
    //console.log( error );
    onResult( error );
  });
}

// this is tricky.
// Check it and fix it if not working
const createDoctorGroup = function(doctorGroupObj, onResult){
  console.log('model.factory : createDoctorGroup');

  const newDoctorGroup = {
    doctor_name : doctorGroupObj.doctor_name,
    doctor_group_name : doctorGroupObj.doctor_group_name
  };
  const ModelDoctorGroup = getDoctorGroupModel(sequelize);
  ModelDoctorGroup.create( newDoctorGroup ).then(function(result){
    console.log('RESULT : ModelDoctorGroup.create');
    //console.log( result );
    onResult(result);
  }).catch(function(error){
    console.log('ERROR : ModelDoctorGroup.create');
    //console.log( error );
    onResult( error );
  });

} //createDoctorGroup/

// Test this
// Fix the things that is not working
// WIP
const createSchedule = function(schedule, onResult){
  console.log('model.factory : createSchedule');
  /*
  schedule_date
  schedule_person_id
  schedule_doctor_id
  schedule_is_morning
  */

  const newSchedule = {
    on_date: schedule.scheduleDate,
    is_morning: schedule.schedule_is_morning
  };
  const ModelSchedule = getScheduleModel(sequelize);
  ModelSchedule.create( newSchedule ).then(function(result){
    console.log('RESULT : ModelSchedule.create');
    onResult( result );
  }).catch(function(error){
    console.log('ERROR : ModelSchedule.create');
    console.log(error);
  });
}; // createSchedule/

// create/

// update
/*
updatePerson
updateDoctor
updateDoctorGroup
updateSchedule
*/

// updatePerson
const updatePerson = function(personObj,onResult){
  console.log('model.factory : updatePerson');
  console.log(personObj);

  const newPerson = {
    name: personObj.person_name ,
    phone: personObj.person_phone ,
    email: personObj.person_email,
    address: personObj.person_address,
    pID: personObj.pID
  }
  const ModelPerson = getPersonModel(sequelize);

  // TODO:
  // Delete the person with ID
  // This should be deleting the Person from DB
  ModelPerson.update( newPerson ).then(function(result){
    console.log('RESULT : ModelPerson.update');
    //console.log( result );
    onResult(result);
  }).catch(function(error){
    console.log('ERROR : ModelPerson.update');
    //console.log( error );
    onResult( error );
  });
};
// updatePerson/
// updateDoctor
const updateDoctor = function(doctorObj,onResult){
  console.log('model.factory : updateDoctor');
  console.log(doctorObj);

  const newDoctor = {
    name: doctorObj.doctor_name ,
    phone: doctorObj.doctor_phone ,
    email: doctorObj.doctor_email,
    address: doctorObj.doctor_address
  }

  const ModelDoctor = getDoctorModel(sequelize);
  ModelDoctor.update( newDoctor ).then(function(result){
    console.log('RESULT : ModelDoctor.update');
    //console.log( result );
    onResult(result);
  }).catch(function(error){
    console.log('ERROR : ModelDoctor.update');
    //console.log( error );
    onResult( error );
  });
};
// updateDoctor/
// updateDoctorGroup
const updateDoctorGroup = function(doctorGroupObj, onResult){
  console.log('model.factory : updateDoctorGroup');

  const newDoctorGroup = {
    doctor_name : doctorGroupObj.doctor_name,
    doctor_group_name : doctorGroupObj.doctor_group_name
  };
  const ModelDoctorGroup = getDoctorGroupModel(sequelize);
  ModelDoctorGroup.update( newDoctorGroup ).then(function(result){
    console.log('RESULT : ModelDoctorGroup.update');
    //console.log( result );
    onResult(result);
  }).catch(function(error){
    console.log('ERROR : ModelDoctorGroup.update');
    //console.log( error );
    onResult( error );
  });
};
// updateDoctorGroup/
// updateSchedule
const updateSchedule = function(schedule, onResult){
  console.log('model.factory : updateSchedule');
  const newSchedule = {
    on_date: schedule.scheduleDate,
    is_morning: schedule.schedule_is_morning
  };
  const ModelSchedule = getScheduleModel(sequelize);
  ModelSchedule.update( newSchedule ).then(function(result){
    console.log('RESULT : ModelSchedule.update');
    onResult( result );
  }).catch(function(error){
    console.log('ERROR : ModelSchedule.update');
    console.log(error);
  });
};
// updateSchedule/
// update/

// delete
/*
deletePerson
deleteDoctor
deleteDoctorGroup
deleteSchedule
*/

// deletePerson
const deletePerson = function(personObj,onResult){
  console.log('model.factory : deletePerson');
  console.log(personObj);
  //personObj.person_id
  
  // Delete the person with ID
  // This should be deleting the Person from DB
  const ModelPerson = getPersonModel(sequelize);
  ModelPerson.destroy({ where:{ id:personObj.person_id } }).then(function(result){
    console.log('model.factory : RESULT : ModelPerson.destroy');
    onResult( result );
  }).catch(function(error){
    console.log('model.factory : ERROR : ModelPerson.destroy');
    onResult( error );
  });

};
// deletePerson/
// deleteDoctor
const deleteDoctor = function(doctorObj,onResult){
  console.log('model.factory : deleteDoctor');
  console.log(doctorObj);//doctor_id

  const ModelDoctor = getDoctorModel(sequelize);
  ModelDoctor.destroy({ where:{ id:doctorObj.doctor_id } }).then(function(result){
    console.log('model.factory : RESULT : ModelDoctor.destroy');
    onResult( result );
  }).catch(function(error){
    console.log('model.factory : ERROR : ModelDoctor.destroy');
    onResult( error );
  });
};
// deleteDoctor/
// delteDoctorGroup
const deleteDoctorGroup = function(doctorGroupObj, onResult){
  console.log('model.factory : deleteDoctorGroup');
  console.log(doctorGroupObj);//doctor_group_id

  const ModelDoctorGroup = getDoctorGroupModel(sequelize);
  ModelDoctorGroup.destroy( {where:{ id:doctorGroupObj.doctor_group_id}} ).then(function(result){
    console.log('RESULT : ModelDoctorGroup.destroy');
    //console.log( result );
    onResult(result);
  }).catch(function(error){
    console.log('ERROR : ModelDoctorGroup.destroy');
    //console.log( error );
    onResult( error );
  });
};
// delteDoctorGroup/
// deleteSchedule
const deleteSchedule = function(scheduleObj, onResult){
  console.log('model.factory : deleteSchedule');
  console.log(scheduleObj);//schedule_id

  const ModelSchedule = getScheduleModel(sequelize);
  ModelSchedule.destroy( {where:{ id:scheduleObj.schedule_id }} ).then(function(result){
    console.log('RESULT : ModelSchedule.destroy');
    onResult( result );
  }).catch(function(error){
    console.log('ERROR : ModelSchedule.destroy');
    console.log(error);
  });
};
// deleteSchedule/
// delete/




// ----------- API calls / ---------------------------------











module.exports = { 
	getSequelize, 
	initModelFactory,
	initTheModels,
	createGroupWithName, 
  createPerson, createDoctor, createDoctorGroup, createSchedule,
  updatePerson, updateDoctor, updateDoctorGroup, updateSchedule,
  deletePerson, deleteDoctor, deleteDoctorGroup, deleteSchedule
}
//