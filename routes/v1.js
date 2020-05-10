//
var express = require('express');
var router = express.Router();

const modelFactory = require('../model/model.factory');

/* GET users listing. */
router.get('/', function(req, res, next) {
  //res.send('version 1.0.0');
  res.render('v1home', { title: 'API | Version 1.0.0' });
});

router.get('/info', function(req, res, next) {
  //res.send('/add ');
  //res.send( JSON.stringify({ version:'1.0.0', usage: 'The Demo' }) );
  /*
  if( modelFactory.getSequelize() ){
		console.log('YES : ModelFactory : initilised');
		console.log('YES : sequelize : available');
		//res.send( JSON.stringify({ version:'1.0.0', usage: 'The Demo', sequelize: true }) );
	}else{
		console.log('NO : ModelFactory : not initilised');
		console.log('NO : sequelize : not available');
		//res.send( JSON.stringify({ version:'1.0.0', usage: 'The Demo', sequelize: false }) );
	}
	*/
	//
	res.send( JSON.stringify({ version:'1.0.0', usage: 'The Demo' }) );
});
//
// ------------------------------- GET -----------------------------------
/*
router.get('/getGroupWithId/:theID', (request,response)=>{
	console.log('getGroupWithId', request.params );
	response.send('getGroupWithId : server : '+ request.params.theID );
	//TODO: make the server call and respond
});
*/
router.get('/getPersonWithId/:pID', (request,response)=>{
	console.log('v1.js : API : getPerson : id : ', request.params.pID);
});
router.get('/getDoctorWithId/:dID', (request,response)=>{
	console.log('v1.js : API : getDoctor : id : ', request.params.dID);
});

router.get('/getGroupWithId/:gID', (request,response)=>{
	console.log('v1.js : API : getGroup : id : ', request.params.gID);
});
router.get('/getDoctorGroupWithId/:dgID', (request,response) => {
	console.log('v1.js : API : getDoctorGroup : id : ', request.params.gID);
});

router.get('/getScheduleById/:sID', (request,response)=>{
	console.log('v1.js : API : getScheduleById : id : ', request.params.sID);
});
router.get('/getScheduleByDoctorId/:id',(request,response)=>{
	console.log('v1.js : API : getScheduleByDoctorId : id : ',request.params.id);
});
router.get('/getScheduleByDoctorGroupId/:id',(request,response)=>{
	console.log('v1.js : API : getScheduleByDoctorGroupId : id : ', request.params.id);
});
router.get('/getScheduleByPersonId/:id',(request,response)=>{
	console.log('v1.js : API : getScheduleByPersonId : id : ',id);
});


router.get('/getAllPeople', (request,response)=>{
	console.log('v1.js : API : allPeople');
	const onCallbackFromDB = function(dbResult){
		console.log('v1.js : getAllPeople : onCallbackFromDB');
		//console.log( dbResult );
		//console.log('sending response to client');
		response.send( dbResult );
	}
	
	modelFactory.getAllPeople(onCallbackFromDB);
});
router.get('/getAllDoctors', (request,response) => {
	console.log('v1.js : API : allDoctors');
});
router.get('/getAllGroups', (request,response)=>{
	console.log('v1.js : API : allGroups');
});
router.get('/getAllDoctorGroups',(request,response)=>{
	console.log('v1.js : API : allDoctorGroups');
});
router.get('/getAllSchedule',(request,response)=>{
	console.log('v1.js : API : allSchedules');
});


// ------------------------------- GET / -----------------------------------
// ------------------------------- POST -----------------------------------

// Group / Organisation / Company 
router.post('/createGroup', (request,response)=>{
	console.log('v1.js : API : CreateGroup');
	console.log( 'request.body=',request.body );

	const newGroupName = request.body.groupName;
	const newGroupAdminName = request.body.userName;
	const newGroupAdminPassword = request.body.userPassword;
	//
	const onCallbackFromDB = function(dbResult){
		console.log('v1.js : onCallbackFromDB');
		//console.log( dbResult );
		console.log('sending response to client');

		response.send( dbResult );
	}
	

	modelFactory.createGroupWithName({
		group_name : newGroupName,
		user_name : newGroupAdminName,
		user_password : newGroupAdminPassword
	},onCallbackFromDB);
	

	/*
	var tNow = new Date();
	var sTime = tNow.getHours()+':'+tNow.getMinutes()+':'+tNow.getSeconds()+':'+tNow.getMilliseconds();
	var result = {
    "fromUIAt": request.body.calledAt,
    "fromServerAt": sTime,
    "greet":"Hello from server",
    "api-message":"POST request to CreateGroup"
  };
  */

  //response.send(result);
});
//---------------------------------------------------------------------------
// Create : 
router.post('/createPerson', (request,response)=>{
	console.log('v1.js : API : CreatePerson');
	//
	console.log( 'request.body=',request.body );
	const newPersonName = request.body.personName;
	const newPersonEmail = request.body.personEmail;
	const newPersonPhone = request.body.personPhone;
	const newPersonAddress = request.body.personAddress;
	//
	const onCallbackFromDB = function(dbResult){
		console.log('v1.js : API : createPerson : onCallbackFromDB');
		//console.log( dbResult );
		//
		// ref: log the Model
		// ref: https://sequelize.org/master/manual/model-instances.html
		console.log('+---------------------------------------');
		console.log( dbResult.toJSON() );
		console.log( JSON.stringify(dbResult, null, 4) );
		console.log('+---------------------------------------');
		//
		response.send( dbResult );
	}
	//
	modelFactory.createPerson({
		person_name : newPersonName,
		person_email : newPersonEmail,
		person_phone : newPersonPhone,
		person_address : newPersonAddress
	}, onCallbackFromDB );
	//
});
router.post('/createDoctor', (request,response)=>{
	console.log('v1.js : API : CreateDoctor');
	//
	console.log( 'request.body=',request.body );
	const newDoctorName = request.body.doctorName;
	const newDoctorEmail = request.body.doctorEmail;
	const newDoctorPhone = request.body.doctorPhone;
	const newDoctorAddress = request.body.doctorAddress;
	//
	const onCallbackFromDB = function(dbResult){
		//console.log('v1.js : createDoctor : onCallbackFromDB');
		//console.log( dbResult );
		response.send( dbResult );
	}
	//
	modelFactory.createDoctor({
		doctor_name : newDoctorName,
		doctor_email : newDoctorEmail,
		doctor_phone : newDoctorPhone,
		doctor_address : newDoctorAddress
	}, onCallbackFromDB );
	//
});
router.post('/createDoctorGroup', (request,response)=>{
	console.log('v1.js : API : CreateDoctorGroup');
	const newDoctorName = request.body.doctorName;
	const newDoctorGroupName = request.body.doctorGroupName;
	//
	const onCallbackFromDB = function(dbResult){
		//console.log('v1.js : createDoctor : onCallbackFromDB');
		//console.log( dbResult );
		response.send( dbResult );
	}
	//
	modelFactory.createDoctorGroup({
		doctor_name : newDoctorName,
		doctor_group_name : newDoctorGroupName
	}, onCallbackFromDB );
	//
});
router.post('/createSchedule', (request,response)=>{
	console.log('v1.js : API : CreateSchedule');
	//
	const scheduleDate = request.body.sDate;
	const schedulePersonId = request.body.personId;
	const scheduleDoctorId = request.body.doctorId;
	const scheduleIsMorning = request.body.isMorning;
	//
	const onCallbackFromDB = function(dbResult){
		response.send( dbResult );
	}
	//
	modelFactory.createSchedule({
		schedule_date : scheduleDate,
		schedule_person_id : schedulePersonId,
		schedule_doctor_id : scheduleDoctorId,
		schedule_is_morning : scheduleIsMorning
	}, onCallbackFromDB );
	//
});
// Create : /
//---------------------------------------------------------------------------
// Update : 
// updatePerson
router.put('/updatePerson', (request,response)=>{
	console.log('v1.js : API : UpdatePerson');
	const personId = request.body.personId;
	const newPersonName = request.body.personName;
	const newPersonEmail = request.body.personEmail;
	const newPersonPhone = request.body.personPhone;
	const newPersonAddress = request.body.personAddress;
	const onCallbackFromDB = function(dbResult){
		console.log('v1.js : API : UpdatePerson : onCallbackFromDB');
		//console.log( dbResult.toJSON() );
		console.log( dbResult );
		//response.send( dbResult );
		response.send(dbResult);
	}
	modelFactory.updatePerson({
		person_id : personId,
		person_name : newPersonName,
		person_email : newPersonEmail,
		person_phone : newPersonPhone,
		person_address : newPersonAddress
	}, onCallbackFromDB );
}); // updatePerson/
// updateDoctor
router.put('/updateDoctor', (request,response)=>{
	console.log('v1.js : API : UpdateDoctor');
	/*
	const newDoctorName = request.body.doctorName;
	const newDoctorEmail = request.body.doctorEmail;
	const newDoctorPhone = request.body.doctorPhone;
	const newDoctorAddress = request.body.doctorAddress;
	const onCallbackFromDB = function(dbResult){
		response.send( dbResult );
	};
	modelFactory.updateDoctor({
		doctor_name : newDoctorName,
		doctor_email : newDoctorEmail,
		doctor_phone : newDoctorPhone,
		doctor_address : newDoctorAddress
	}, onCallbackFromDB );
	*/
	const newDoctorId = request.body.doctorId;
	const newDoctorName = request.body.doctorName;
	const newDoctorEmail = request.body.doctorEmail;
	const newDoctorPhone = request.body.doctorPhone;
	const newDoctorAddress = request.body.doctorAddress;

	const onCallbackFromDB = function(dbResult){
		console.log('v1.js : API : UpdateDoctor : onCallbackFromDB');
		//console.log( dbResult );
		response.send( dbResult );
	};

	modelFactory.updateDoctor({
		doctor_id : newDoctorId,
		doctor_name : newDoctorName,
		doctor_email : newDoctorEmail,
		doctor_phone : newDoctorPhone,
		doctor_address : newDoctorAddress
	}, onCallbackFromDB );
}); // updateDoctor/
// updateDoctorGroup
router.put('/updateDoctorGroup', (request,response)=>{
	console.log('v1.js : API : UpdateDoctorGroup');
	
	const newDoctorGroupId = request.body.doctorGroupId;
	const newDoctorId = request.body.doctorId;
	const newGroupId = request.body.groupId;
	//
	const onCallbackFromDB = function(dbResult){
		response.send( dbResult );
	}
	//
	modelFactory.updateDoctorGroup({
		doctor_group_id : newDoctorGroupId,
		doctor_id : newDoctorId,
		group_id : newGroupId,
	}, onCallbackFromDB );
	//
}); // updateDoctorGroup/
// updateSchedule
router.put('/updateSchedule', (request,response)=>{
	console.log('v1.js : API : UpdateSchedule');

	const scheduleId = request.body.scheduleId;
	const scheduleDate = request.body.sDate;
	const scheduleIsMorning = request.body.isMorning;
	const schedulePersonId = request.body.personId;
	const scheduleDoctorId = request.body.doctorId;
	const scheduleGroupId = request.body.groupId;
	//
	const onCallbackFromDB = function(dbResult){
		response.send( dbResult );
	}
	//
	modelFactory.updateSchedule({
		schedule_id : scheduleId,
		schedule_date : scheduleDate,
		schedule_isMorning : scheduleIsMorning,
		schedule_person_id : schedulePersonId,
		schedule_doctor_id : scheduleDoctorId,
		schedule_group_id : scheduleGroupId
	}, onCallbackFromDB );
}); // updateSchedule/

// Update : /
//---------------------------------------------------------------------------
// Delete :

// deletePerson
router.delete('/deletePerson', (request,response)=>{
	console.log('v1.js : API : DeletePerson');
	const personId = request.body.personId;
	const onCallbackFromDB = function(dbResult){
		//response.send( dbResult );
		console.log('v1.js : API : DeletePerson : onCallbackFromDB');
		//res.sendStatus(status);
		//response.sendStatus( dbResult );
		console.log( 'dbResult=',dbResult );

		var result = '';
		if( dbResult===1 ){
			result = 'SUCCESS';
		}else{
			result = 'FAIL';
		}

		response.send( {'result':result} );
		//response.send( dbResult );
	}
	//
	modelFactory.deletePerson({ person_id : personId }, onCallbackFromDB );
}); // deletePerson/
// deleteDoctor
router.delete('/deleteDoctor', (request,response)=>{
	console.log('v1.js : API : DeleteDoctor');
	const doctorId = request.body.doctorId;
	const onCallbackFromDB = function(dbResult){
		//response.send( dbResult );
		console.log('v1.js : API : DeleteDoctor : onCallbackFromDB');
		console.log( 'dbResult=',dbResult );
		var result = '';
		if( dbResult===1 ){
			result = 'SUCCESS';
		}else{
			result = 'FAIL';
		}
		response.send( {'result':result} );
	}
	modelFactory.deleteDoctor({ doctor_id : doctorId }, onCallbackFromDB );
}); // deleteDoctor/

router.delete('/deleteDoctorGroup', (request,response)=>{
	console.log('v1.js : API : DeleteDoctorGroup');
	const doctorGroupId = request.body.doctorGroupId;
	const onCallbackFromDB = function(dbResult){
		console.log('v1.js : API : DeleteDoctorGroup : onCallbackFromDB');
		console.log( 'dbResult=',dbResult );
		var result = '';
		if( dbResult===1 ){
			result = 'SUCCESS';
		}else{
			result = 'FAIL';
		}
		response.send( {'result':result} );
	}
	modelFactory.deleteDoctorGroup({
		doctor_group_id : doctorGroupId
	}, onCallbackFromDB );
});
router.delete('/deleteSchedule', (request,response)=>{
	console.log('v1.js : API : DeleteSchedule');
	const scheduleId = request.body.scheduleId;
	const onCallbackFromDB = function(dbResult){
		console.log('v1.js : API : DeleteSchedule : onCallbackFromDB');
		console.log( 'dbResult=',dbResult );
		var result = '';
		if( dbResult===1 ){
			result = 'SUCCESS';
		}else{
			result = 'FAIL';
		}
		response.send( {'result':result} );
	}
	modelFactory.deleteSchedule({
		schedule_id : scheduleId
	}, onCallbackFromDB );
});
// Delete : /
//---------------------------------------------------------------------------

// ------------------------------- POST / -----------------------------------



//
module.exports = router;
