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

// ------------------------------- GET / -----------------------------------
// ------------------------------- POST -----------------------------------

router.post('/createGroup', (request,response)=>{
	console.log('v1.js : API : CreateGroup');
	console.log( 'request.body=',request.body );
	var newGroupName = request.body.groupName;
	var newGroupAdminName = request.body.userName;
	var newGroupAdminPassword = request.body.userPassword;
	
	modelFactory.createGroupWithName({
		gName : newGroupName,
		gAdminName : newGroupAdminName,
		gAdminPassword : newGroupAdminPassword
	});
	
	var tNow = new Date();
	var sTime = tNow.getHours()+':'+tNow.getMinutes()+':'+tNow.getSeconds()+':'+tNow.getMilliseconds();
	var result = {
    "fromUIAt": request.body.calledAt,
    "fromServerAt": sTime,
    "greet":"Hello from server",
    "api-message":"POST request to CreateGroup"
  };
  response.send(result);
});

// ------------------------------- POST / -----------------------------------



//
module.exports = router;
