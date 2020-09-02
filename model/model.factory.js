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

const getAppUsageModel = require('./appusage.model');

const getPersonModel = require('./person.model');
const getGroupModel = require('./group.model');
//const getPersonGroupModel = require('./personGroup.model');

const getDoctorModel = require('./doctor.model.js');
const getDoctorGroupModel = require('./doctorGroup.model');

const getScheduleModel = require('./schedule.model');
const getPrescriptionModel = require('./prescription.model');
const getBillModel = require('./bill.model');

var sequelize = null;

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

  const AppUsage = getAppUsageModel(sequelize);
  AppUsage.sync({force:true})
    .then( ()=> console.log('Sequelize: Synced! AppUsage Model') )
    .catch( err=>console.log('Sequelize: Model Error: ModelPerson: initTheModels: ',err) );

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
  	console.error('Sequelize: Model Error : ModelGroup : ', err);
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
      console.error('Sequelize: Model Error : ModelDoctor : ', err);
  });

  const ModelDoctorGroup = getDoctorGroupModel(sequelize);
  ModelDoctorGroup.sync({force:true}).then(()=>{
  	console.log('Sequelize: Synced! ModelDoctorGroup');
  	//console.log(ModelDoctorGroup);
  }).catch(err=>{
  	console.log('+--- Sequelize - Error ---------------');
  	console.error('Sequelize: Model Error : ModelDoctorGroup : ', err);
  });

  const ScheduleModel = getScheduleModel(sequelize);
  ScheduleModel.sync({force:true}).then(()=>{
  	console.log('Sequelize: Synced! ScheduleModel');
  	//console.log(ScheduleModel);
  }).catch(err=>{
  	console.log('+--- Sequelize - Error ---------------');
  	console.error('Sequelize: Model Error : ScheduleModel : ', err);
  });

  const PrescriptionModel = getPrescriptionModel(sequelize);
  PrescriptionModel.sync( {force:true} ).then( ()=>{
    console.log('Sequelize: Synced! PrescriptionModel');
  } ).catch( err => {
    console.log('+--- Sequelize - Error ---------------');
    console.error('Sequelize: Model Error : PrescriptionModel : ', err);
  });

  const BillModel = getBillModel(sequelize);
  BillModel.sync( {force:true} ).then( ()=>{
    console.log('Sequelize: Synced! BillModel');
  } ).catch( err => {
    console.log('+--- Sequelize - Error ---------------');
    console.error('Sequelize: Model Error : BillModel : ', err);
  });

} // initTheModels/

// ----------- API calls ---------------------------------

//--------------------- GET -----------------

//-------- with id -----------
const getPersonWithId = (onResult,idToSearchFor)=>{
  const ModelPerson = getPersonModel(sequelize);
  /*
  ModelPerson.findAll({
    where:{ id:idToSearchFor }
  }).then((result)=>{
    onResult(result);
  }).catch((error)=>{
    onResult(error);
  });
  */
  /*
  // find by PrimaryKey
  ModelPerson.findByPk(idToSearchFor).then((result)=>{
    onResult(result);
  }).catch((error)=>{
    onResult(error);
  });
  */

  ModelPerson.findOne({
    where:{ id:idToSearchFor }
  }).then((result)=>{
    onResult(result);
  }).catch((error)=>{
    onResult(error);
  });

  
};

const getPersonWith_Id_Pw = ( onResult, idToSearchFor, password )=>{
  const ModelPerson = getPersonModel(sequelize);
  ModelPerson.findOne({
    where:
    { 
      id : idToSearchFor, 
      password : password 
    }
  }).then((result)=>{
    onResult(result);
  }).catch((error)=>{
    onResult(error);
  });
};

const getDoctorWith_Id_Pw = ( onResult, idToSearchFor, password )=>{
  const ModelDoctor = getDoctorModel(sequelize);
  ModelDoctor.findOne({
    where: { id : idToSearchFor, password : password }
  }).then( result=> onResult(result) ).catch( error=> onResult(error) );
};

const getDoctorWithId = (onResult,idToSearchFor)=>{
  const ModelDoctor = getDoctorModel(sequelize);
  ModelDoctor.findOne({
    where : { id : idToSearchFor }
  }).then((result)=>{
    onResult(result);
  }).catch((error)=>{
    onResult(error);
  });
};
const getGroupWithId = (onResult,idToSearchFor)=>{
  const ModelGroup = getGroupModel(sequelize);
  ModelGroup.findOne({
    where : { id : idToSearchFor }
  }).then((result)=>{
    onResult(result);
  }).catch((error)=>{
    onResult(error);
  });
};
const getDoctorGroupWithId = (onResult,idToSearchFor)=>{
  const ModelDoctorGroup = getDoctorGroupModel(sequelize);
  ModelDoctorGroup.findOne({
    where : { id : idToSearchFor }
  }).then((result)=>{
    onResult(result);
  }).catch((error)=>{
    onResult(error);
  });
};

const getAllDoctorIdsByGroupId = (onResult,idToSearchFor)=>{
  //const ModelPerson = getPersonModel(sequelize);
  const ModelDoctor = getDoctorModel(sequelize);
  const ModelDoctorGroup = getDoctorGroupModel(sequelize);
  //ModelPerson.findAll({ where:{id : personObj.person_id} }).then(function(dbPersonObj){}).catch(function(error){});
  ModelDoctorGroup.findAll({
    where : { groupId: idToSearchFor }
  }).then(function(doctorGroups){
    //onResult(doctorGroups);
    //TODO: find the doctors from these Groups {doctorId,groupId}

    
    var aDoctorIds = doctorGroups.map(function(item){
      return item.doctorId
    });
    onResult(aDoctorIds);
    

    /*
    // This is not working
    // Feels bad to do this, anyway.
    // Need to find a way to do this in a better way.

    var aDoctors = doctorGroups.map(function(item){
      return item.doctorId
      
      ModelDoctor.findOne({
        where : { id : item.doctorId }
      }).then((result_1)=>{
        //console.log('result_1', result_1);
        //console.log('result_1:result_1.toJSON()', result_1.toJSON() );
        var doctor = result_1.toJSON();
        //console.log('result_1: doctor', doctor );
        return doctor;
      }).catch((error_1)=>{
        console.log('error_1', error_1)
      });
    });
    console.log('getAllDoctorsByGroupId : aDoctors : ',aDoctors);
    */

  }).catch(function(error){
    onResult(error);
  });
}

const getScheduleById = (onResult,idToSearchFor)=>{
  const ScheduleModel = getScheduleModel(sequelize);
  ScheduleModel.findOne({
    where : { id : idToSearchFor }
  }).then((result)=>{
    onResult(result);
  }).catch((error)=>{
    onResult(error);
  });
};
const getSchedulesByDoctorId = (onResult,idToSearchFor)=>{
  const ScheduleModel = getScheduleModel(sequelize);
  ScheduleModel.findAll({
    where : { doctorId : idToSearchFor }
  }).then((result)=>{
    onResult(result);
  }).catch((error)=>{
    onResult(error);
  });
};
const getScheduleByDoctorGroupId = (onResult,idToSearchFor)=>{
  const ScheduleModel = getScheduleModel(sequelize);
  ScheduleModel.findAll({
    where : { groupId : idToSearchFor }
  }).then((result)=>{
    onResult(result);
  }).catch((error)=>{
    onResult(error);
  });
};
const getScheduleByPersonId = (onResult,idToSearchFor)=>{
  const ScheduleModel = getScheduleModel(sequelize);
  ScheduleModel.findAll({
    where : { personId : idToSearchFor }
  }).then((result)=>{
    onResult(result);
  }).catch((error)=>{
    onResult(error);
  });
};
const getAllSchedulesByClinicByDoctorOnDate = (onResult, searchObj)=>{
  const ScheduleModel = getScheduleModel(sequelize);
  ScheduleModel.findAll({
    where : { 
      doctorId : searchObj.dId,
      groupId : searchObj.cId,
      on_date : searchObj.onDate 
    }
  }).then((result)=>{
    onResult(result);
  }).catch((error)=>{
    onResult(error);
  });
};

const getPrescriptionsByPatientId = (onResult, idToSearchFor) => {
  const PrescriptionModel = getPrescriptionModel(sequelize);
  PrescriptionModel.findAll({
    where : { personId : idToSearchFor }
  }).then((result)=>{
    onResult(result);
  }).catch((error)=>{
    onResult(error);
  });
}

const getBillsByPatientId = (onResult, idToSearchFor) => {
  const BillModel = getBillModel(sequelize);
  BillModel.findAll({
    where : { personId : idToSearchFor }
  }).then( (result)=> onResult(result) ).catch( (error)=> onResult(error) );
}

//-------- with id / -----------

const checkValidityOfClinic = (onResult, searchObj)=>{
  console.log('checkValidityOfClinic',searchObj);

  const cid = searchObj.cid;
  const cname = searchObj.cAdminUserName;
  const cpassword = searchObj.cAdminUserPw;

  const ModelGroup = getGroupModel(sequelize);
  ModelGroup.findAll({
    where : {
      id : cid,
      user_name : cname,
      user_password : cpassword
    }
  }).then(function(clinics){
    onResult(clinics);
  }).catch(function(error){
    onResult(error);
  }); 

}// checkValidityOfClinic/

const getAllPeople = (onResult)=>{
  const ModelPerson = getPersonModel(sequelize);
  //ModelPerson.findAll({ where:{id : personObj.person_id} }).then(function(dbPersonObj){}).catch(function(error){});
  ModelPerson.findAll().then(function(people){
    onResult(people);
  }).catch(function(error){
    onResult(error);
  });
}

const getAllDoctors = (onResult)=>{
  //const ModelPerson = getPersonModel(sequelize);
  const ModelDoctor = getDoctorModel(sequelize);
  //ModelPerson.findAll({ where:{id : personObj.person_id} }).then(function(dbPersonObj){}).catch(function(error){});
  ModelDoctor.findAll().then(function(doctors){
    onResult(doctors);
  }).catch(function(error){
    onResult(error);
  });
}

const getAllGroups = (onResult)=>{
  const ModelGroup = getGroupModel(sequelize);
  ModelGroup.findAll().then(function(doctors){
    onResult(doctors);
  }).catch(function(error){
    onResult(error);
  });
}
const getAllDoctorGroups = (onResult)=>{
  const ModelDoctorGroup = getDoctorGroupModel(sequelize);
  ModelDoctorGroup.findAll().then(function(doctorGroups){
    onResult(doctorGroups);
  }).catch(function(error){
    onResult(error);
  });
}
const getAllSchedules = (onResult)=>{
  const ModelSchedule = getScheduleModel(sequelize);
  ModelSchedule.findAll().then((schedules)=>{
    onResult(schedules);
  }).catch((error)=>{
    onResult(error);
  });
}
//--------------------- GET / ------------------------------------

//----------------- POST ---------------------------------------

// create
//
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
} // createGroupWithName/

//
const createPerson = function(personObj,onResult){
  console.log('model.factory : createPerson');
  console.log(personObj);

  const newPerson = {
    name: personObj.person_name,
    phone: personObj.person_phone,
    email: personObj.person_email,
    address: personObj.person_address,
    password: personObj.person_password
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
  console.log('+---------------------------------');
  console.log(doctorObj);
  console.log('+---------------------------------');

  const newDoctor = {
    name : doctorObj.doctor_name ,
    password : doctorObj.doctor_password,
    phone : doctorObj.doctor_phone ,
    email : doctorObj.doctor_email,
    specialization : doctorObj.specialization,
    address : doctorObj.doctor_address
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


const createDoctorGroup = function(doctorGroupObj, onResult){
  console.log('model.factory : createDoctorGroup');

  const newDoctorGroup = {
    doctor_name : doctorGroupObj.doctor_name,
    doctor_group_name : doctorGroupObj.doctor_group_name,
    doctorId : doctorGroupObj.doctor_id,
    groupId : doctorGroupObj.group_id
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


const createSchedule = function(schedule, onResult){
  console.log('model.factory : createSchedule');
  //console.log('schedule', schedule);
  const ModelSchedule = getScheduleModel(sequelize);
  ModelSchedule.create( schedule ).then(function(result){
    console.log('RESULT : ModelSchedule.create');
    onResult( result );
  }).catch(function(error){
    console.log('ERROR : ModelSchedule.create');
    console.log(error);
  });
}; // createSchedule/

// CreatePrescription
const createPrescription = function(prescription, onResult){
  console.log('model.factory : createPrescription');
  //console.log( JSON.stringify(prescription) );

  const ModelPrescription = getPrescriptionModel(sequelize);
  ModelPrescription.create(prescription).then(function(result){
    console.log('RESULT : ModelPrescription.create');
    onResult(result);
  }).catch(function(error){
    console.log('ERROR : ModelPrescription.create');
    console.log(error)
  });
};
// CreatePrescription/
// createBill
const createBill = function(bill,onResult){
  console.log('model.factory : createBill');
  const ModelBill = getBillModel(sequelize);
  ModelBill.create(bill).then(function(result){
    console.log('RESULT : ModelBill.create');
    onResult(result);
  }).catch(function(error){
    console.log('ERROR : ModelBill.create');
    console.log(error);
  });
};// createBill/

// createAppUsage
const createAppUsage = function(usageObj,onResult){
  console.log('model.factory : createAppUsage');
  //console.log('usageObj', usageObj);
  const AppUsage = getAppUsageModel(sequelize);
  AppUsage.create(usageObj).then( result=> onResult(result) ).catch( error=>onResult(error) );
};// createAppUsage/

const assignDoctorToClinic = function(assignment, onResult){
  console.log('model.factory : assignDoctorToClinic');
  //console.log('assignment', assignment);
  // assignment.clinincId, assignment.doctorId

  const newAssignment = {
    doctorId : assignment.doctorId,
    groupId : assignment.clinincId
  };
  const ModelDoctorGroup = getDoctorGroupModel(sequelize);
  ModelDoctorGroup.create( newAssignment ).then(function(result){
    console.log('RESULT : ModelDoctorGroup.create');
    onResult( result );
  }).catch(function(error){
    console.log('ERROR : ModelDoctorGroup.create');
    console.log(error);
  });
}; // assignDoctorToClinic/

//TODO: Move this to UPDATE call instead of POST here
const activateClinic = function(activationObj, onResult){
  console.log('model.factory : activateClinic');
  //console.log('activationObj', activationObj);
  // activationObj.clinincId, activationObj.activeFrom, activationObj.activeTo

  const newActivation = {
    activated_from: activationObj.activeFrom,
    activated_to: activationObj.activeTo
  };
  // 
  //const ModelDoctorGroup = getDoctorGroupModel(sequelize);
  const ModelGroup = getGroupModel(sequelize);
  ModelGroup.update( newActivation, {where: {id: activationObj.clinincId} }).then(function(result){
    console.log('RESULT : ModelGroup.UPDATE');
    onResult( result );
  }).catch(function(error){
    console.log('ERROR : ModelGroup.UPDATE');
    console.log(error);
  });
}; // activateClinic/

// create/
//----------------- POST / ---------------------------------------

// update
// TODO: All the UPDATE functions are to be fixed with ERROR checking
// TODO: return 0 or 1 for the result, instead of Strings
//

//----------------- UPDATE ---------------------------------------

// updateGroup
const updateGroup = function(groupObj,onResult){
  console.log('model.factory : updateGroup');
  console.log(groupObj);

  const ModelGroup = getGroupModel(sequelize);
  ModelGroup.update({
    group_name: groupObj.group_name ,
    user_name: groupObj.user_name ,
    user_password: groupObj.user_password,
    activated_on: groupObj.activated_on,
    activated_from: groupObj.activated_from,
    activated_to: groupObj.activated_to
  },{ where:{ id : groupObj.group_id } }).then(function(result2){
    console.log('result2');
    console.log( result2 );
    console.log( 'Number of rows updated =', result2[0] );
    onResult({"result" : "SUCCESS : done", "NumberOfRows Updated": result2[0]});
    console.log('result2 /');
  }).catch(function(error2){
    console.log('error2');
    console.log(error2);
    onResult({"result" : "ERROR!"});
    console.log('error2');
  });
}// updategroup /


// updatePerson
const updatePerson = function(personObj,onResult){
  console.log('model.factory : updatePerson');
  //console.log(personObj);

  var resultCallback = onResult;

  const newPerson = {
    id: personObj.person_id,
    name: personObj.person_name ,
    phone: personObj.person_phone ,
    email: personObj.person_email,
    address: personObj.person_address,
    password: personObj.person_password,
    pID: personObj.pID
  }
  
  //console.log( newPerson );

  const ModelPerson = getPersonModel(sequelize);

  // There are 2 ways to UPDATE
  // 1. calling the static method on MODEL
  // 2. calling instance method on MODEL instance

  /*
  // METHOD : 1
  // calling UPDATE on Model Class itself, static method

  ModelPerson.update({
    name: personObj.person_name ,
    phone: personObj.person_phone ,
    email: personObj.person_email,
    address: personObj.person_address
  },{ where:{ id : personObj.person_id } }).then(function(result2){
    console.log('result2');
    console.log( result2 );
    console.log( 'Number of rows updated =', result2[0] );
    onResult({"result" : "SUCCESS : done"});
    console.log('result2 /');
  }).catch(function(error2){
    console.log('error2');
    console.log(error2);
    onResult({"result" : "ERROR!"});
    console.log('error2');
  });
  */


  // METHOD : 2
  // calling UPDATE on Model instance

  //ModelPerson.findAll
  ModelPerson.findOne({ where:{id : personObj.person_id} }).then(function(dbPersonObj){
    //console.log('--- RESULT ---');
    //console.log( personObj );
    //onResult({"result" : "SUCCESS : done"});

    // UPDATE personObj
    dbPersonObj.update({
      name: personObj.person_name,
      phone: personObj.person_phone ,
      email: personObj.person_email,
      address: personObj.person_address,
      password: personObj.person_password,
    }).then(function(result){
      console.log('model.factory : updatePerson : SUCCESS : ');
      //console.log( result );
      console.log( result.toJSON() );
      //onResult(personObj);
      onResult({"result" : "SUCCESS : done"});
      console.log('model.factory : updatePerson : SUCCESS / : ');
    }).catch(function(error2){
      console.log('model.factory : updatePerson : ERROR : ');
      console.log(error2);
      console.log('model.factory : updatePerson : ERROR / : ');
    });
    //console.log( result.toJSON() );
    //onResult(personObj);
    //console.log('--- RESULT / ---');
  }).catch(function(error1){
    console.log('--- ERROR ----');
    //console.log(error1);
    
    onResult({"result" : "ERROR : Not Found"});
    
    console.log('--- ERROR / ---');
  });

};// updatePerson/

// updateDoctor
const updateDoctor = function(doctorObj,onResult){
  console.log('model.factory : updateDoctor');
  //console.log(doctorObj);

  /*
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
  */

  const ModelDoctor = getDoctorModel(sequelize);
  ModelDoctor.update({
    name : doctorObj.doctor_name ,
    password : doctorObj.doctor_password,
    phone : doctorObj.doctor_phone ,
    email : doctorObj.doctor_email,
    specialization : doctorObj.specialization,
    address : doctorObj.doctor_address
  },{ where:{ id : doctorObj.doctor_id } }).then(function(result2){
    console.log('result2');
    console.log( result2 );
    console.log( 'Number of rows updated =', result2[0] );
    onResult({"result" : "SUCCESS : done", "NumberOfRows Updated": result2[0]});
    console.log('result2 /');
  }).catch(function(error2){
    console.log('error2');
    console.log(error2);
    onResult({"result" : "ERROR!"});
    console.log('error2');
  });
};// updateDoctor/

// updateDoctorGroup
const updateDoctorGroup = function(doctorGroupObj, onResult){
  console.log('model.factory : updateDoctorGroup');
  /*
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
  */
  const ModelDoctorGroup = getDoctorGroupModel(sequelize);
  ModelDoctorGroup.update({
    doctorId : doctorGroupObj.doctor_id,
    groupId : doctorGroupObj.group_id
  },{ where:{ id : doctorGroupObj.doctor_group_id } }).then(function(result2){
    console.log('result2');
    console.log( result2 );
    console.log( 'Number of rows updated =', result2[0] );
    onResult({"result" : "SUCCESS : done", "NumberOfRows Updated": result2[0]});
    console.log('result2 /');
  }).catch(function(error2){
    console.log('error2');
    console.log(error2);
    onResult({"result" : "ERROR!"});
    console.log('error2');
  });
};// updateDoctorGroup/

// updateSchedule
const updateSchedule = function(schedule, onResult){
  console.log('model.factory : updateSchedule');
  /*
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
  */
  const ModelSchedule = getScheduleModel(sequelize);
  ModelSchedule.update({
    on_date : schedule.on_date,
    is_morning : schedule.is_morning,
    personId : schedule.personId,
    doctorId : schedule.doctorId,
    groupId : schedule.groupId,

    isAttended: schedule.isAttended,
    isWeb: schedule.isWeb,
    webURL: schedule.webURL,
    web_at_time: schedule.web_at_time
  },{ where:{ id : schedule.id } }).then(function(result2){
    console.log('result2');
    console.log( result2 );
    console.log( 'Number of rows updated =', result2[0] );
    onResult({"result" : "SUCCESS : done", "NumberOfRows Updated": result2[0]});
    console.log('result2 /');
  }).catch(function(error2){
    console.log('error2');
    console.log(error2);
    onResult({"result" : "ERROR!"});
    console.log('error2');
  });
};// updateSchedule/

// update/
//----------------- UPDATE / ---------------------------------------

//----------------- DELETE  ---------------------------------------

// delete

// deleteGroup
const deleteGroup = function(groupObj,onResult){
  console.log('model.factory : deleteGroup');
  console.log(groupObj); //groupObj.group_id
  
  const ModelGroup = getGroupModel(sequelize);
  ModelGroup.destroy({ where:{ id : groupObj.group_id } }).then(function(result){
    console.log('model.factory : RESULT : ModelGroup.destroy');
    onResult( result );
  }).catch(function(error){
    console.log('model.factory : ERROR : ModelGroup.destroy');
    onResult( error );
  });

};// deleteGroup/

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

};// deletePerson/

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
};// deleteDoctor/

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
};// delteDoctorGroup/

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
};// deleteSchedule/

// delete/

//----------------- DELETE / ---------------------------------------




// ----------- API calls / ---------------------------------


module.exports = { 
	getSequelize, 
	initModelFactory,
	initTheModels,
  createPerson, createDoctor, createDoctorGroup, createSchedule, createGroupWithName, 
  createPrescription, createBill,
  updatePerson, updateDoctor, updateDoctorGroup, updateSchedule, updateGroup,
  deletePerson, deleteDoctor, deleteDoctorGroup, deleteSchedule, deleteGroup,
  getAllPeople, getAllDoctors, getAllGroups, getAllDoctorGroups, getAllSchedules,
  getPersonWithId, getDoctorWithId, getGroupWithId, getDoctorGroupWithId, getScheduleById,
  getSchedulesByDoctorId, getScheduleByDoctorGroupId, getScheduleByPersonId, 
  getPrescriptionsByPatientId, getBillsByPatientId,

  getPersonWith_Id_Pw, getDoctorWith_Id_Pw,

  assignDoctorToClinic, activateClinic, checkValidityOfClinic, 
  getAllSchedulesByClinicByDoctorOnDate, getAllDoctorIdsByGroupId,

  createAppUsage, 
}
//