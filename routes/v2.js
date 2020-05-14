//
// API : Version : 2.0.0
//

var express = require('express');
var router = express.Router();

var modelFactory = require('../model/model.factory');

//**********************************************************************
// Render the UI for Version 2
// url : http://localhost:3000/api/v2/
//
router.get('/', function(req, res, next) {
  //res.render('v1home', { title: 'API | Version 2.0.0' });
  res.render('v2home', {
  	"title" : 'API | Version 2.0.0',
  	"allAPIs" : ["group"],
  	"by" : "Saumya"
  });
});
//**********************************************************************


//-------------------------------------------------------------------------------------
//----------- GROUP ------------------
//-------------------------------------------------------------------------------------
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

//-------------------------------------------------------------------------------------
//----------- GROUP : / : ------------------
//-------------------------------------------------------------------------------------


//finally

module.exports = router;