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

router.post('/createPerson', (request,response)=>{
	console.log('v1.js : API : CreatePerson');
});
router.post('/createDoctor', (request,response)=>{
	console.log('v1.js : API : CreateDoctor');
});
router.post('/createDoctorGroup', (request,response)=>{
	console.log('v1.js : API : CreateDoctorGroup');
});
router.post('/createSchedule', (request,response)=>{
	console.log('v1.js : API : CreateSchedule');
});

// ------------------------------- POST / -----------------------------------



//
module.exports = router;
