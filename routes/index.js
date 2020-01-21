//
//
const express = require('express');
const router = express.Router();

const modelFactory = require('../model/model.factory');


//------------------------------------- API -----------------------------------

/* GET home page. */
router.get('/', function(req, res, next) {
	/*
	console.log( 'Route : / :-------------- modelFactory --------------' );
	console.log( modelFactory.getSequelize() );
	console.log( 'Route : / :-------------- modelFactory / --------------' );
	*/

	if( modelFactory.getSequelize() ){
		console.log('YES : ModelFactory : initilised');
		console.log('YES : sequelize : available');
	}else{
		console.log('NO : ModelFactory : not initilised');
		console.log('NO : sequelize : not available');
	}

	//
	// 'modelFactory.getSequelize()' will return 'null' or 'sequelize' object
	// depending upon whether the 'modelFactory' has been initialised or not.
	// Generally it is done in Application entry with call 'modelFactory.initModelFactory()'
	//
  res.render('index', { title: 'Express | Sequelize | API' });
});

router.get('/initDB',function(request,response,next){
	modelFactory.initTheModels();
	response.send('initDB');
});

router.get('/ormCheck',function(request,response,next){
	//const result = connCheck();
	response.send( JSON.stringify({'Checked':true}) );
});

module.exports = router;
