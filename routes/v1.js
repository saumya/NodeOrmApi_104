//
// todo:
// updateGroup, deleteGroup
//
var express = require('express');
var router = express.Router();

const modelFactory = require('../model/model.factory');

/* GET users listing. */
router.get('/', function(req, res, next) {
  //res.send('version 1.0.0');
  res.render('v1home', {
  	"title" : 'API | Version 1.0.0',
  	"endPoint" : "http://localhost:3000/api/v1",
  	"allAPIs" : {
  								"GET Person" : "/getPersonWithId/:id",
  								"GET Doctor" : "/getDoctorWithId/:id",
  								"GET Group" : "/getGroupWithId/:id",
  								"GET DoctorGroup" : "/getDoctorGroupWithId/:id",
  								"GET Schedule by Id" : "/getScheduleById/:id",
  								"GET Schedule by DoctorId" : "/getSchedulesByDoctorId/:id",
  								"GET Schedule by DoctorGroupId" : "/getScheduleByDoctorGroupId/:id",
  								"GET Schedule by PersonId" : "/getScheduleByPersonId/:id",
  								"GET All People" : "/getAllPeople",
  								"GET All Groups" : "/getAllGroups",
  								"GET All DoctorGroups" : "/getAllDoctorGroups",
  								"GET All Schedules" : "/getAllSchedules"
  								},
  	"aObj" : ["All","/getPersonWithId/:id","/getDoctorWithId/:id"],
  	"by" : "Saumya"
  });
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

	const id = request.params.pID;
	const onCallbackFromDB = (dbResult) => {
		console.log('v1.js : API : getPersonWithId : onCallbackFromDB');
		//console.log('dbResult',dbResult);
		if(dbResult===null){ dbResult = {"result":0} };
		response.send( dbResult );
	}
	modelFactory.getPersonWithId(onCallbackFromDB, id);
});

router.get('/getDoctorWithId/:dID', (request,response)=>{
	console.log('v1.js : API : getDoctor : id : ', request.params.dID);

	const id = request.params.dID;
	const onCallbackFromDB = (dbResult) => {
		console.log('v1.js : API : getDoctorWithId : onCallbackFromDB');
		//console.log( 'dbResult',dbResult );
		if(dbResult===null){ dbResult = {"result":0} };
		response.send( dbResult );
	}
	modelFactory.getDoctorWithId(onCallbackFromDB, id);
});

router.get('/getGroupWithId/:gID', (request,response)=>{
	console.log('v1.js : API : getGroup : id : ', request.params.gID);

	const id = request.params.gID;
	const onCallbackFromDB = (dbResult) => {
		console.log('v1.js : API : getGroupWithId : onCallbackFromDB');
		//console.log( 'dbResult',dbResult );
		if(dbResult===null){ dbResult = {"result":0} };
		response.send( dbResult );
	}
	modelFactory.getGroupWithId(onCallbackFromDB, id);
});
router.get('/getDoctorGroupWithId/:dgID', (request,response) => {
	console.log('v1.js : API : getDoctorGroup : id : ', request.params.dgID);

	const id = request.params.dgID;
	const onCallbackFromDB = (dbResult) => {
		console.log('v1.js : API : getDoctorGroupWithId : onCallbackFromDB');
		//console.log( 'dbResult',dbResult );
		if(dbResult===null){ dbResult = {"result":0} };
		response.send( dbResult );
	}
	modelFactory.getDoctorGroupWithId(onCallbackFromDB, id);
});

router.get('/getScheduleById/:sID', (request,response)=>{
	console.log('v1.js : API : getScheduleById : id : ', request.params.sID);

	const id = request.params.sID;
	const onCallbackFromDB = (dbResult) => {
		console.log('v1.js : API : getScheduleById : onCallbackFromDB');
		//console.log( 'dbResult',dbResult );
		if(dbResult===null){ dbResult = {"result":0} };
		response.send( dbResult );
	}
	modelFactory.getScheduleById(onCallbackFromDB, id);
});

router.get('/getSchedulesByDoctorId/:id',(request,response)=>{
	console.log('v1.js : API : getSchedulesByDoctorId : id : ',request.params.id);

	const id = request.params.id;
	const onCallbackFromDB = (dbResult) => {
		console.log('v1.js : API : getSchedulesByDoctorId : onCallbackFromDB');
		//console.log( 'dbResult',dbResult );
		if(dbResult===null){ dbResult = {"result":0} };
		response.send( dbResult );
	}
	modelFactory.getSchedulesByDoctorId(onCallbackFromDB, id);
});

router.get('/getScheduleByDoctorGroupId/:id',(request,response)=>{
	console.log('v1.js : API : getScheduleByDoctorGroupId : id : ', request.params.id);

	const id = request.params.id;
	const onCallbackFromDB = (dbResult) => {
		console.log('v1.js : API : getScheduleByDoctorGroupId : onCallbackFromDB');
		//console.log( 'dbResult',dbResult );
		if(dbResult===null){ dbResult = {"result":0} };
		response.send( dbResult );
	}
	modelFactory.getScheduleByDoctorGroupId(onCallbackFromDB, id);
});

router.get('/getScheduleByPersonId/:id',(request,response)=>{
	console.log('v1.js : API : getScheduleByPersonId : id : ', request.params.id);

	const id = request.params.id;
	const onCallbackFromDB = (dbResult) => {
		console.log('v1.js : API : getScheduleByPersonId : onCallbackFromDB');
		//console.log( 'dbResult',dbResult );
		if(dbResult===null){ dbResult = {"result":0} };
		response.send( dbResult );
	}
	modelFactory.getScheduleByPersonId(onCallbackFromDB, id);
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
	const onCallbackFromDB = function(dbResult){
		console.log('v1.js : getAllDoctors : onCallbackFromDB');
		response.send( dbResult );
	}
	modelFactory.getAllDoctors(onCallbackFromDB);
});
router.get('/getAllGroups', (request,response)=>{
	console.log('v1.js : API : getAllGroups');
	const onCallbackFromDB = function(dbResult){
		console.log('v1.js : getAllGroups : onCallbackFromDB');
		response.send( dbResult );
	}
	modelFactory.getAllGroups(onCallbackFromDB);
});
router.get('/getAllDoctorGroups',(request,response)=>{
	console.log('v1.js : API : allDoctorGroups');
	const onCallbackFromDB = (dbResult) => {
		console.log('v1.js : API : getAllDoctorGroups : onCallbackFromDB');
		response.send( dbResult );
	}
	modelFactory.getAllDoctorGroups(onCallbackFromDB);
});
router.get('/getAllSchedules',(request,response)=>{
	console.log('v1.js : API : allSchedules');
	const onCallbackFromDB = (dbResult) => {
		console.log('v1.js : API : getAllSchedules : onCallbackFromDB');
		response.send( dbResult );
	}
	modelFactory.getAllSchedules(onCallbackFromDB);
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


//**********************************************************************

/*
** This method uses different HTTP verbs to separate the calls for different actioins
** in the database
*/

router.route('/group')
	.all((req,res,next)=>{
		// runs for all HTTP verbs first
		console.log('v1.js : router.route : all : /group');
		console.log( req.body );
		next();
	})
	.get((req,res,next)=>{
		res.send({"GET":"Group READ", "Request Body": (req.body)});
	})
	.put((req,res,next)=>{
		res.send({"PUT":"Group UPDATE", "Request Body": (req.body)});
	})
	.post((req,res,next)=>{
		
		res.send({"POST":"Group CREATE", "Request Body": (req.body) });
	})
	.delete((req,res,next)=>{
		res.send({"DELETE":"Group DELETE", "Request Body": (req.body)});
	});
//**********************************************************************

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

	const newDoctorGroup_doctorId = request.body.doctorId;
	const newDoctorGroup_groupId = request.body.groupId;
	//
	const onCallbackFromDB = function(dbResult){
		//console.log('v1.js : createDoctor : onCallbackFromDB');
		//console.log( dbResult );
		response.send( dbResult );
	}
	//
	modelFactory.createDoctorGroup({
		doctor_name : newDoctorName,
		doctor_group_name : newDoctorGroupName,
		doctor_id : newDoctorGroup_doctorId,
		group_id : newDoctorGroup_groupId
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

// updateGroup
router.put('/updateGroup', (request,response)=>{
	console.log('v1.js : API : updateGroup');
	
	const groupId = request.body.groupId;
	const groupName = request.body.groupName;
	const groupAdminUserName = request.body.adminUserName;
	const groupAdminUserPassword = request.body.adminPassword;
	const groupActivatedOn = request.body.activatedOn;
	const groupActiveFrom = request.body.activeFrom;
	const groupActiveTo = request.body.activeTo;

	const onCallbackFromDB = function(dbResult){
		console.log('v1.js : API : UpdatePerson : onCallbackFromDB');
		//console.log( dbResult.toJSON() );
		//console.log( dbResult );
		response.send(dbResult);
	}
	modelFactory.updateGroup({
		group_id : groupId,
		group_name : groupName,
		user_name : groupAdminUserName,
		user_password : groupAdminUserPassword,
		activated_on : groupActivatedOn,
		activated_from : groupActiveFrom,
		activated_to : groupActiveTo
	}, onCallbackFromDB );


	//response.send({"result": "TODO"});
});
// updateGroup /
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

// deleteGroup
router.delete('/deleteGroup', (request,response)=>{
	console.log('v1.js : API : deleteGroup');
	const groupId = request.body.groupId;
	const onCallbackFromDB = function(dbResult){
		//response.send( dbResult );
		console.log('v1.js : API : DeleteGroup : onCallbackFromDB');
		console.log( 'dbResult=',dbResult );
		var result = '';
		if( dbResult===1 ){
			result = 'SUCCESS';
		}else{
			result = 'FAIL';
		}
		response.send( {'result':result} );
	}
	modelFactory.deleteGroup({ group_id : groupId }, onCallbackFromDB );
});

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
