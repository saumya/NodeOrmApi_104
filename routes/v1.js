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
router.get('/findGroupWithId/:theID', (request,response)=>{
	console.log('findGroupWithId', request.params );
	response.send('findGroupWithId : server : '+ request.params.theID );
	//TODO: make the server call and respond
});

//

router.post('/getPerson', (request,response)=>{
	console.log('v1.js : API : getPerson');
});
router.post('/getDoctor', (request,response)=>{
	console.log('v1.js : API : getDoctor');
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
// Update : 
router.post('/updatePerson', (request,response)=>{
	console.log('v1.js : API : UpdatePerson');
	const newPersonName = request.body.personName;
	const newPersonEmail = request.body.personEmail;
	const newPersonPhone = request.body.personPhone;
	const newPersonAddress = request.body.personAddress;
	const onCallbackFromDB = function(dbResult){
		response.send( dbResult );
	}
	modelFactory.updatePerson({
		person_name : newPersonName,
		person_email : newPersonEmail,
		person_phone : newPersonPhone,
		person_address : newPersonAddress
	}, onCallbackFromDB );
});
router.post('/updateDoctor', (request,response)=>{
	console.log('v1.js : API : UpdateDoctor');
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
});
router.post('/updateDoctorGroup', (request,response)=>{
	console.log('v1.js : API : UpdateDoctorGroup');
	const newDoctorName = request.body.doctorName;
	const newDoctorGroupName = request.body.doctorGroupName;
	//
	const onCallbackFromDB = function(dbResult){
		response.send( dbResult );
	}
	//
	modelFactory.updateDoctorGroup({
		doctor_name : newDoctorName,
		doctor_group_name : newDoctorGroupName
	}, onCallbackFromDB );
	//
});
router.post('/updateSchedule', (request,response)=>{
	console.log('v1.js : API : UpdateSchedule');
	const scheduleDate = request.body.sDate;
	const schedulePersonId = request.body.personId;
	const scheduleDoctorId = request.body.doctorId;
	//
	const onCallbackFromDB = function(dbResult){
		response.send( dbResult );
	}
	//
	modelFactory.updateSchedule({
		schedule_date : scheduleDate,
		schedule_person_id : schedulePersonId,
		schedule_doctor_id : scheduleDoctorId
	}, onCallbackFromDB );
});
// Update : /
// Delete : 
router.post('/deletePerson', (request,response)=>{
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
	modelFactory.deletePerson({
		person_id : personId
	}, onCallbackFromDB );
});
router.post('/deleteDoctor', (request,response)=>{
	console.log('v1.js : API : DeleteDoctor');
	const doctorId = request.body.doctorId;
	const onCallbackFromDB = function(dbResult){
		response.send( dbResult );
	}
	modelFactory.deleteDoctor({
		doctor_id : doctorId
	}, onCallbackFromDB );
});
router.post('/deleteDoctorGroup', (request,response)=>{
	console.log('v1.js : API : DeleteDoctorGroup');
	const doctorGroupId = request.body.doctorGroupId;
	const onCallbackFromDB = function(dbResult){
		response.send( dbResult );
	}
	modelFactory.deleteDoctorGroup({
		doctor_group_id : doctorGroupId
	}, onCallbackFromDB );
});
router.post('/deleteSchedule', (request,response)=>{
	console.log('v1.js : API : DeleteSchedule');
	const scheduleId = request.body.scheduleId;
	const onCallbackFromDB = function(dbResult){
		response.send( dbResult );
	}
	modelFactory.deleteSchedule({
		schedule_id : scheduleId
	}, onCallbackFromDB );
});
// Delete : /

// ------------------------------- POST / -----------------------------------



//
module.exports = router;
