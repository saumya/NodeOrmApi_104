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

// TODO

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

// TODO:

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
		//console.log('v1.js : createPerson : onCallbackFromDB');
		//console.log( dbResult );

		response.send( dbResult );
	}
});
router.post('/createDoctor', (request,response)=>{
	console.log('v1.js : API : CreateDoctor');
	//
	console.log( 'request.body=',request.body );
	const newDoctorName = request.body.doctorName;
	const newDoctorEmail = request.body.doctorEmail;
	const newDonctorPhone = request.body.doctorPhone;
	const newDoctorAddress = request.body.doctorAddress;
	//
	const onCallbackFromDB = function(dbResult){
		//console.log('v1.js : createDoctor : onCallbackFromDB');
		//console.log( dbResult );

		response.send( dbResult );
	}
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
});
router.post('/createSchedule', (request,response)=>{
	console.log('v1.js : API : CreateSchedule');
	//
	const scheduleDate = request.body.sDate;
	const schedulePersonId = request.body.personId;
	const scheduleDoctorId = request.body.doctorId;
	//
	const onCallbackFromDB = function(dbResult){
		response.send( dbResult );
	}
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
});
router.post('/updateDoctor', (request,response)=>{
	console.log('v1.js : API : UpdateDoctor');
});
router.post('/updateDoctorGroup', (request,response)=>{
	console.log('v1.js : API : UpdateDoctorGroup');
});
router.post('/updateSchedule', (request,response)=>{
	console.log('v1.js : API : UpdateSchedule');
});
// Update : /
// Delete : 
router.post('/deletePerson', (request,response)=>{
	console.log('v1.js : API : DeletePerson');
	const personId = request.body.personId;
	const onCallbackFromDB = function(dbResult){
		response.send( dbResult );
	}
});
router.post('/deleteDoctor', (request,response)=>{
	console.log('v1.js : API : DeleteDoctor');
	const doctorId = request.body.doctorId;
	const onCallbackFromDB = function(dbResult){
		response.send( dbResult );
	}
});
router.post('/deleteDoctorGroup', (request,response)=>{
	console.log('v1.js : API : DeleteDoctorGroup');
	const doctorGroupId = request.body.doctorGroupId;
	const onCallbackFromDB = function(dbResult){
		response.send( dbResult );
	}
});
router.post('/deleteSchedule', (request,response)=>{
	console.log('v1.js : API : DeleteSchedule');
	const scheduleId = request.body.scheduleId;
	const onCallbackFromDB = function(dbResult){
		response.send( dbResult );
	}
});
// Delete : /

// ------------------------------- POST / -----------------------------------



//
module.exports = router;
